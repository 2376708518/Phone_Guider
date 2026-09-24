package com.eurochat.translate

import android.accessibilityservice.AccessibilityService
import android.graphics.Color
import android.graphics.Rect
import android.os.Bundle
import android.view.Gravity
import android.view.WindowManager
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.TextView
import com.google.mlkit.nl.languageid.LanguageIdentification
import com.google.mlkit.nl.translate.*
import java.util.concurrent.ConcurrentHashMap

class ChatAccessibilityService : AccessibilityService() {
    private val wm by lazy { getSystemService(WINDOW_SERVICE) as WindowManager }
    private val overlays = mutableListOf<TextView>()
    private var bubble: Button? = null
    private var currentPeerLanguage: String? = null
    private val cache = ConcurrentHashMap<String, String>()
    private val langCache = ConcurrentHashMap<String, String>()
    private var enabled = true
    private val translators = ConcurrentHashMap<String, Translator>()
    private val european = setOf("bg","hr","cs","da","nl","et","fi","fr","de","el","hu","it","lv","lt","pl","pt","ro","sk","sl","es","sv","no","ca","ga","mt","uk")

    override fun onServiceConnected() { super.onServiceConnected(); showBubble() }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        val pkg = event?.packageName?.toString() ?: return
        if (pkg != "com.whatsapp.w4b") return
        rootInActiveWindow ?: return
        translateVisibleMessages()
    }

    override fun onInterrupt() {}

    private fun translateVisibleMessages() {
        if (!enabled) return
        clearTranslationOverlays()
        val root = rootInActiveWindow ?: return
        val nodes = mutableListOf<Pair<AccessibilityNodeInfo,String>>()
        collectText(root, nodes)
        nodes.takeLast(24).forEach { (node, text) ->
            if (text.length < 3 || looksLikeUi(text) || mostlyChinese(text)) return@forEach
            val rect = Rect(); node.getBoundsInScreen(rect)
            if (rect.width() < 30 || rect.height() < 15) return@forEach
            val known = langCache[text]
            val handle: (String) -> Unit = { lang ->
                if (lang in european) {
                    currentPeerLanguage = lang
                    langCache[text] = lang
                    val cached = cache[text]
                    if (cached != null) showTranslation(rect, cached) else translate(text, lang, "zh") { zh ->
                        cache[text] = zh; showTranslation(rect, zh)
                    }
                }
            }
            if (known != null) handle(known) else LanguageIdentification.getClient().identifyLanguage(text).addOnSuccessListener(handle)
        }
    }

    private fun collectText(node: AccessibilityNodeInfo, out: MutableList<Pair<AccessibilityNodeInfo,String>>) {
        val t = node.text?.toString()?.trim().orEmpty()
        if (t.isNotEmpty()) out += node to t
        for (i in 0 until node.childCount) node.getChild(i)?.let { collectText(it, out) }
    }

    private fun looksLikeUi(s: String): Boolean {
        val x=s.lowercase(); return x in setOf("whatsapp","whatsapp business","online","typing…","typing...","message","send","photo","video","document","sticker","voice message") || s.matches(Regex("^\\d{1,2}:\\d{2}$")) || s.matches(Regex("^\\d{1,2}/\\d{1,2}/\\d{2,4}$"))
    }
    private fun mostlyChinese(s:String)= s.count { it.code in 0x4E00..0x9FFF } > s.length/3

    private fun translator(src:String, dst:String): Translator {
        val key="$src>$dst"
        return translators.getOrPut(key) {
            Translation.getClient(TranslatorOptions.Builder().setSourceLanguage(src).setTargetLanguage(dst).build())
        }
    }

    private fun translate(text:String, src:String, dst:String, done:(String)->Unit) {
        val tr=translator(src,dst)
        tr.downloadModelIfNeeded().addOnSuccessListener {
            tr.translate(text).addOnSuccessListener(done)
        }
    }

    private fun showTranslation(anchor: Rect, translated: String) {
        val tv = TextView(this).apply {
            text = "中：$translated"; textSize = 13f; setTextColor(Color.rgb(15,70,45)); setBackgroundColor(Color.argb(235,225,255,238)); setPadding(12,7,12,7)
        }
        val width = minOf((resources.displayMetrics.widthPixels*0.72).toInt(), maxOf(anchor.width(), 240))
        val lp = WindowManager.LayoutParams(width, WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
            android.graphics.PixelFormat.TRANSLUCENT).apply {
            gravity = Gravity.TOP or Gravity.START
            x = anchor.left.coerceAtLeast(0)
            y = (anchor.bottom + 2).coerceAtMost(resources.displayMetrics.heightPixels-120)
        }
        try { wm.addView(tv, lp); overlays += tv } catch (_:Exception) {}
    }

    private fun clearTranslationOverlays() {
        overlays.forEach { try { wm.removeView(it) } catch (_:Exception) {} }; overlays.clear()
    }

    private fun showBubble() {
        if (bubble != null) return
        val b=Button(this).apply { text="译"; textSize=16f; setOnClickListener { translateComposer() }; setOnLongClickListener { enabled = !enabled; text = if (enabled) "译" else "停"; if (!enabled) clearTranslationOverlays(); true } }
        val lp=WindowManager.LayoutParams(150,110,WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,android.graphics.PixelFormat.TRANSLUCENT).apply {
            gravity=Gravity.END or Gravity.CENTER_VERTICAL; x=8; y=120
        }
        try { wm.addView(b,lp); bubble=b } catch (_:Exception) {}
    }

    private fun translateComposer() {
        val root=rootInActiveWindow ?: return
        val edits=mutableListOf<AccessibilityNodeInfo>()
        findEdits(root, edits)
        val edit=edits.lastOrNull { !it.text.isNullOrBlank() } ?: return
        val original=edit.text?.toString()?.trim().orEmpty()
        if (original.isBlank()) return
        val target=currentPeerLanguage ?: return
        translate(original,"zh",target) { result ->
            val args=Bundle().apply { putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE,result) }
            edit.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT,args)
        }
    }

    private fun findEdits(node:AccessibilityNodeInfo, out:MutableList<AccessibilityNodeInfo>) {
        if (node.className?.toString()=="android.widget.EditText" || node.isEditable) out += node
        for(i in 0 until node.childCount) node.getChild(i)?.let { findEdits(it,out) }
    }

    override fun onDestroy() {
        clearTranslationOverlays(); bubble?.let { try { wm.removeView(it) } catch (_:Exception) {} }; bubble=null
        translators.values.forEach { it.close() }; super.onDestroy()
    }
}
