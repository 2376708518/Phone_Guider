# 🚀 快速开始指南

## 📦 项目结构

```
ecommerce-rag/
├── scripts/
│   ├── tb_api.js              # 淘宝 API 接入 ⭐
│   ├── weekly_update.js       # 每周自动更新
│   ├── rag_manager.js         # RAG 库管理
│   ├── search.js              # 智能搜索
│   ├── param_explainer.js     # 参数形象化解释
│   ├── sales_style.js         # 真实导购风格
│   └── ...
├── references/
│   ├── products.json          # 商品数据库 (68 款)
│   ├── tb_config.json.example # 淘宝 API 配置模板
│   └── ...
└── docs/
    ├── TAOBAO_API_GUIDE.md    # 淘宝 API 接入指南
    ├── WEEKLY_UPDATE_GUIDE.md # 每周更新指南
    └── PARAM_EXPLAINER_GUIDE.md # 参数解释指南
```

---

## ⚡ 5 分钟快速开始

### 1️⃣ 测试 RAG 库（无需配置）

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 查看商品库统计
node scripts/rag_manager.js stats

# 搜索手机
node scripts/rag_manager.js search --keyword=小米 --limit=5
```

### 2️⃣ 配置淘宝 API（可选，用于真实价格）

```bash
# 查看配置指南
cat TAOBAO_API_GUIDE.md

# 复制配置模板
cp references/tb_config.json.example references/tb_config.json

# 编辑配置（填入你的 app_key 和 app_secret）
# 从 https://pub.alimama.com/ 申请
```

### 3️⃣ 测试淘宝 API

```bash
# 测试连接
node scripts/tb_api.js test

# 搜索商品
node scripts/tb_api.js search 小米手机
```

### 4️⃣ 运行每周更新

```bash
# 手动运行
node scripts/weekly_update.js

# 或设置定时任务（每周日早上 8 点）
crontab -e
# 添加：0 8 * * 0 cd /home/admin/.openclaw/workspace/skills/ecommerce-rag && node scripts/weekly_update.js
```

---

## 💬 在对话中使用

直接对我说：

```
📱 "预算 4000 左右，帮我推荐个手机"
📷 "想要拍照好的手机"
🔋 "电池续航好的手机"
🎮 "打游戏不卡的手机"
📊 "对比一下小米和华为"
🆕 "更新一下手机库"
```

我会用**真实导购风格**回答，带参数形象化解释！

---

## 📊 核心功能

| 功能 | 命令/对话 | 说明 |
|------|----------|------|
| **商品搜索** | `search --keyword=小米` | 从 RAG 库快速检索 |
| **价格比较** | `phone_compare.js` | 品牌价格对比分析 |
| **参数解释** | 自动 | 把参数翻译成生活场景 |
| **导购风格** | 自动 | 温柔理性的真实导购 |
| **淘宝 API** | `tb_api.js test` | 真实价格检查 |
| **每周更新** | `weekly_update.js` | 自动更新价格和新品 |

---

## 📋 商品库数据

| 指标 | 数值 |
|------|------|
| 商品总数 | 68 款 |
| 手机数量 | 61 款 |
| 品牌数量 | 10 个 |
| 价格范围 | ¥2499 - ¥9999 |
| 数据更新 | 每周自动 |

### 品牌覆盖
- Apple (8 款)
- 小米 (11 款)
- 华为 (8 款)
- OPPO (6 款)
- vivo (9 款)
- 荣耀 (6 款)
- 三星 (5 款)
- 一加 (4 款)
- iQOO (5 款)
- realme (3 款)

---

## 🎯 使用场景

### 场景 1: 选购推荐
```
用户："预算 4000 左右，有什么推荐？"

回答：
您好呀～预算 4000 左右对吧？

这个价位我特别推荐小米 15，为什么呢？

首先性能方面，它用的是骁龙 8 Elite 处理器。
这么说吧，您平时刷抖音、聊微信、甚至玩原神
都完全够用，而且用个三四年不会卡。

电池 5400mAh，早上满电出门，晚上回家大概
还有 20% 左右，重度使用一天没问题...
```

### 场景 2: 价格对比
```bash
node scripts/phone_compare.js
```

输出各品牌价格区间、代表机型、购买建议。

### 场景 3: 参数解释
```
用户："这个 6000mAh 电池怎么样？"

回答：
电池很大！这么说吧：
- 刷抖音能看 15 小时
- 打游戏能玩 8 小时
- 待机可以 3 天
重度使用一天半没问题，两天一充也可以。
```

---

## 🔧 高级配置

### 接入淘宝 API

详细步骤见：`TAOBAO_API_GUIDE.md`

1. 申请淘宝联盟账号
2. 创建应用获取密钥
3. 配置 `references/tb_config.json`
4. 测试连接

### 设置定时更新

```bash
# 每周日早上 8 点自动更新
crontab -e
0 8 * * 0 cd /home/admin/.openclaw/workspace/skills/ecommerce-rag && node scripts/weekly_update.js
```

### 添加更多商品

```bash
# 编辑 import_phones.js 添加新机数据
node scripts/import_phones.js
```

---

## 📞 获取帮助

| 问题 | 文档 |
|------|------|
| 淘宝 API 配置 | `TAOBAO_API_GUIDE.md` |
| 每周更新设置 | `WEEKLY_UPDATE_GUIDE.md` |
| 参数解释规则 | `PARAM_EXPLAINER_GUIDE.md` |
| 手机数据库 | `PHONE_DATABASE.md` |

---

## ✅ 检查清单

开始前确认：

- [ ] RAG 库正常（68 款商品）
- [ ] 能搜索商品
- [ ] 参数解释正常
- [ ] 导购风格正常
- [ ] （可选）淘宝 API 配置
- [ ] （可选）定时更新设置

---

**一切就绪！开始使用吧！** 🦞

```bash
# 试试搜索
node scripts/rag_manager.js search --keyword=手机 --limit=3

# 或者在对话中直接问我
"帮我推荐个手机"
```
