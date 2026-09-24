# EuroChat Translate — WhatsApp Business 自用版 V0.2

专门针对 Android WhatsApp Business（包名 `com.whatsapp.w4b`）。

## 功能
- 欧洲主要语言自动识别并翻译为简体中文
- 中文译文以 Accessibility Overlay 显示在原消息附近
- 缓存已识别语言和译文，减少重复翻译
- 自动记住最近识别到的客户语言
- WhatsApp Business 输入中文后，短按悬浮“译”按钮：翻译为当前客户语言并替换输入框
- 不自动发送，用户确认后手动发送
- 长按“译”按钮暂停/恢复阅读翻译
- 仅监听 WhatsApp Business，不监听普通 WhatsApp

## 支持方向
意大利语、西班牙语、法语、德语、葡萄牙语、波兰语、荷兰语、捷克语、匈牙利语、罗马尼亚语、保加利亚语、克罗地亚语、斯洛伐克语、斯洛文尼亚语、希腊语、丹麦语、瑞典语、芬兰语、爱沙尼亚语、拉脱维亚语、立陶宛语等 ↔ 中文（具体以 ML Kit 支持模型为准）。

## 安装/构建
1. 用 Android Studio 打开项目。
2. 安装 Android SDK 35。
3. Gradle Sync。
4. Build > Build APK(s)。
5. 手机安装 APK。
6. 打开 EuroChat Translate，进入辅助功能设置并启用服务。
7. 打开 WhatsApp Business。首次遇到某语言时需联网下载 ML Kit 模型。

## 使用
- 阅读：打开客户聊天，译文会显示在可见外语消息附近。
- 回复：在 WhatsApp Business 输入中文，短按悬浮“译”，等待输入框被替换为客户语言，确认后手动发送。
- 暂停：长按“译”，按钮变“停”；再次长按恢复。

## 注意
这是个人侧载测试版。WhatsApp Business UI 更新可能影响节点读取和译文定位。ML Kit 非英语语言之间可能经英语中转，重要售后/金额/地址内容发送前务必核对。

## 用 GitHub 生成 APK
把本 ZIP **解压后文件夹里面的全部内容**上传到新建 GitHub 仓库根目录（包括 `.github` 文件夹）；在仓库 Actions 页面选择 Build Android APK → Run workflow。构建成功后，进入该次运行页面最下面 Artifacts，下载 `EuroChatTranslate-WABusiness-debug-apk`，解压得到 `app-debug.apk`。通过微信文件传输助手发送 APK 到三星手机，下载后点击文件安装；如有提示，在手机设置中允许微信安装未知应用。该安装包为测试版，首次启用需在 Android 辅助功能设置中手动授权。
