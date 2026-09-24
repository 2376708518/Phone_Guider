package com.eurochat.translate

import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val pad = (24 * resources.displayMetrics.density).toInt()
        val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setPadding(pad,pad,pad,pad) }
        root.addView(TextView(this).apply { text = "EuroChat Translate"; textSize = 28f })
        root.addView(TextView(this).apply {
            text = "WhatsApp Business 专用 · 欧洲语言 ↔ 中文\n\n阅读：外语消息附近显示中文译文\n回复：输入中文后，悬浮按钮翻译成当前客户语言并替换输入框"
            textSize = 16f; setPadding(0,pad/2,0,pad)
        })
        root.addView(Button(this).apply { text = "开启辅助功能"; setOnClickListener { startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)) } })
        root.addView(TextView(this).apply {
            text = "首次使用会按需下载 ML Kit 语言模型。翻译默认在设备端执行。\n\nV0.2 自用测试版：仅监听 WhatsApp Business。短按悬浮“译”翻译回复；长按可暂停/恢复阅读翻译。发送前请人工确认译文。"
            textSize = 14f; setPadding(0,pad,0,0)
        })
        setContentView(root)
    }
}
