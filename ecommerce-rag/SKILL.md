# 电商导购助手 Skill

智能电商导购助手，提供商品搜索、价格比较、参数解释、购买推荐等服务。内置 68+ 款手机数据，支持淘宝 API 实时价格更新。

---

## 🎯 触发场景

当用户提到以下关键词或需求时触发此 Skill：

### 商品搜索
- "帮我找商品"、"推荐商品"、"买什么好"
- "搜索 XXX"、"查找 XXX"、"有没有 XXX"

### 选购咨询
- "预算 XXX 左右，有什么推荐"
- "想买个手机，求推荐"
- "XXX 元价位哪个性价比高"
- "送长辈/送女朋友什么手机好"

### 价格比较
- "比价"、"哪个平台便宜"、"哪里买划算"
- "XXX 和 XXX 哪个值得买"
- "对比一下 XXX 和 XXX"

### 参数咨询
- "这个参数怎么样"、"6000mAh 电池够用吗"
- "骁龙 8Gen3 性能如何"、"2K 屏幕有什么用"
- "拍照好的手机"、"续航好的手机"

### 品牌/品类
- "淘宝"、"京东"、"拼多多"、"电商"
- "小米"、"华为"、"苹果"、"OPPO"、"vivo"
- "手机"、"数码"、"旗舰机"、"性价比"

---

## 🚀 核心功能

### 1. 商品搜索 (`search_products`)

**功能**: 从 RAG 库快速检索商品

**参数**:
- `keyword`: 搜索关键词
- `category`: 分类筛选（数码/服饰/家居等）
- `min_price`: 最低价格
- `max_price`: 最高价格
- `platform`: 平台筛选（淘宝/京东/拼多多等）
- `limit`: 返回数量（默认 5）

**示例**:
```javascript
search_products({ keyword: '小米', max_price: 4000, limit: 5 })
```

**返回**:
```json
{
  "products": [...],
  "total": 5,
  "filters": {...}
}
```

---

### 2. 智能推荐 (`recommend_products`)

**功能**: 根据用户需求生成推荐清单

**参数**:
- `budget`: 预算范围
- `usage`: 使用场景（游戏/拍照/续航/日常）
- `preference`: 偏好（品牌/屏幕大小/重量等）

**示例**:
```javascript
recommend_products({ 
  budget: '4000-5000', 
  usage: '拍照',
  preference: '小米或华为'
})
```

**返回**:
```json
{
  "recommendations": [
    {
      "product": {...},
      "reason": "推荐理由",
      "pros": ["优点 1", "优点 2"],
      "cons": ["缺点 1"],
      "suitable_for": "适合人群"
    }
  ]
}
```

---

### 3. 价格比较 (`compare_prices`)

**功能**: 跨平台/跨品牌比较价格

**参数**:
- `keywords`: 商品关键词列表
- `platforms`: 平台列表（可选）

**示例**:
```javascript
compare_prices({ keywords: ['iPhone 16', '小米 15'] })
```

**返回**:
```json
{
  "comparison": [...],
  "best_deal": {...},
  "price_chart": {...}
}
```

---

### 4. 参数解释 (`explain_params`)

**功能**: 将技术参数翻译成生活场景

**参数**:
- `param_type`: 参数类型（processor/battery/screen 等）
- `param_value`: 参数值

**示例**:
```javascript
explain_params({ param_type: 'battery', param_value: '6000mAh' })
```

**返回**:
```
"电池很大！这么说吧：
- 刷抖音能看 15 小时
- 打游戏能玩 8 小时
- 待机可以 3 天
重度使用一天半没问题"
```

---

### 5. 品牌对比 (`compare_brands`)

**功能**: 对比不同品牌的特点和优势

**参数**:
- `brands`: 品牌列表

**示例**:
```javascript
compare_brands({ brands: ['小米', '华为', 'OPPO'] })
```

**返回**:
```json
{
  "brands": [
    {
      "name": "小米",
      "price_range": "¥2999-¥6999",
      "avg_price": 4849,
      "features": ["性价比", "徕卡影像"],
      "recommended": "小米 15"
    }
  ],
  "summary": "对比总结"
}
```

---

### 6. 更新数据 (`update_database`)

**功能**: 更新 RAG 库数据（价格/新品）

**参数**:
- `force`: 是否强制更新
- `source`: 数据源（taobao/manual）

**示例**:
```javascript
update_database({ force: false, source: 'taobao' })
```

**返回**:
```json
{
  "updated": true,
  "price_changes": 5,
  "new_products": 2,
  "report": "更新报告"
}
```

---

## 💬 对话示例

### 示例 1: 选购推荐

**用户**: "预算 4000 左右，帮我推荐个手机"

**助手**:
```
您好呀～预算 4000 左右对吧？

这个价位我特别推荐您看看小米 15，为什么呢？

首先性能方面，它用的是骁龙 8 Elite 处理器。
这么说吧，您平时刷抖音、聊微信、甚至玩原神
都完全够用，而且用个三四年不会卡。

电池 5400mAh，早上满电出门，晚上回家大概
还有 20% 左右，重度使用一天没问题。

屏幕 6.36 英寸，这个尺寸现在很少见了。
单手能操作，放口袋不鼓，现在旗舰机动不动
就 6.8 英寸，拿在手里像块砖头，这个尺寸
其实挺难得的。

不过也有个小缺点——充电 90W 虽然不慢，
但比不过一些 120W 的，15 分钟就能充满。
不过日常使用其实感知不强，看您介不介意。

总的来说，这个价位它性价比很高。
您平时拍照多吗？要是对拍照要求高，
我再给您推荐两款拍照更好的...
```

### 示例 2: 参数解释

**用户**: "6000mAh 电池怎么样？够用吗？"

**助手**:
```
6000mAh 是超大电池了！这么说吧：

🔋 实际使用场景：
- 刷抖音：能看 15 小时
- 打游戏：能玩 8 小时
- 看小说：能用 2 天
- 待机：3 天没问题

📊 充电频率：
重度使用一天半，轻度使用两天一充。
早上满电出门，晚上回家大概还有 30%。

对比一下：
- iPhone 16 Pro Max：4685mAh，一天一充
- 小米 15：5400mAh，一天没问题
- 这款：6000mAh，一天半没问题

要是经常外出、懒得带充电宝，这个电池
容量很适合您！
```

### 示例 3: 品牌对比

**用户**: "小米和华为哪个值得买？"

**助手**:
```
这两个品牌各有优势，我给您对比一下：

📱 小米
- 价格区间：¥2999-¥6999
- 平均价格：¥4849
- 优势：性价比高、性能强、徕卡影像
- 适合：追求性价比、喜欢折腾、游戏玩家
- 推荐：小米 15 (¥4499)

📱 华为
- 价格区间：¥4999-¥8999
- 平均价格：¥7187
- 优势：鸿蒙系统、信号好、拍照强
- 适合：商务人士、注重品牌、日常使用
- 推荐：Mate 60 Pro (¥6999)

💡 我的建议：
- 预算 4000-5000：选小米，性价比更高
- 预算 6000+：可以考虑华为，品牌和系统更好
- 打游戏多：小米性能释放更好
- 商务使用：华为更有面子

您预算多少？主要用来做什么呢？
```

---

## 📋 使用方法

### 方式 1: 对话中使用（推荐）

直接对用户说：
```
"帮我推荐个手机"
"预算 4000 左右"
"想要拍照好的"
```

### 方式 2: 命令行使用

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 搜索商品
node scripts/rag_manager.js search --keyword=小米 --limit=5

# 品牌对比
node scripts/phone_compare.js

# 参数解释
node scripts/param_explainer.js

# 每周更新
node scripts/weekly_update.js
```

### 方式 3: 代码调用

```javascript
const { searchProducts, recommendProducts } = require('./scripts/rag_manager.js');
const { explainParams } = require('./scripts/param_explainer.js');
const { generateSalesResponse } = require('./scripts/sales_style.js');

// 搜索
const products = searchProducts({ keyword: '小米', max_price: 4000 });

// 推荐
const recommendations = recommendProducts({ budget: '4000-5000', usage: '拍照' });

// 参数解释
const explanation = explainParams('battery', '6000mAh');
```

---

## 🔧 配置说明

### 淘宝 API 配置（可选）

用于获取真实价格和优惠券：

1. 申请淘宝联盟：https://pub.alimama.com/
2. 创建应用获取密钥
3. 编辑 `references/tb_config.json`:

```json
{
  "app_key": "你的 app_key",
  "app_secret": "你的 app_secret",
  "adzone_id": "你的 adzone_id"
}
```

### RAG 库配置

编辑 `references/config.json`:

```json
{
  "rag": {
    "type": "local",
    "data_file": "./references/products.json",
    "max_items": 10000
  },
  "search": {
    "default_limit": 20,
    "enable_fuzzy": true
  }
}
```

---

## 📊 数据说明

### 商品库数据

| 指标 | 数值 |
|------|------|
| 商品总数 | 68+ 款 |
| 手机数量 | 61 款 |
| 品牌数量 | 10 个 |
| 价格范围 | ¥2499 - ¥9999 |
| 更新频率 | 每周自动 |

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

### 数据字段

每款商品包含：
- 基本信息：名称、品牌、价格、平台
- 详细参数：处理器、屏幕、电池、摄像、内存等
- 销售信息：销量、评分、标签
- 购买链接：商品链接、推广链接
- 时间信息：入库时间、更新时间

---

## 🎯 回复风格

### 原则

1. **温柔理性**: 像线下导购，不硬推销
2. **形象解释**: 参数翻译成生活场景
3. **客观中立**: 说明优缺点，让用户自己决定
4. **追问需求**: 了解用户真实使用场景

### 技巧

| 技巧 | 示例 |
|------|------|
| 生活场景 | "刷抖音能看 12 小时" 而不是 "6000mAh" |
| 对比参照 | "比 iPhone 16 Pro Max 还大" |
| 说明人群 | "适合重度游戏玩家" |
| 购买建议 | "这个价位性价比最高" |
| 留有余地 | "您可以先试试手感，觉得合适再考虑" |

---

## 🔄 更新维护

### 每周自动更新

```bash
# 手动运行
node scripts/weekly_update.js

# 定时任务（每周日早上 8 点）
crontab -e
0 8 * * 0 cd /home/admin/.openclaw/workspace/skills/ecommerce-rag && node scripts/weekly_update.js
```

### 更新内容

1. **数据备份**: 自动备份当前数据
2. **价格检查**: 检查淘宝/天猫价格变化
3. **新品添加**: 添加新发布机型
4. **下架检测**: 标记下架商品
5. **统计报告**: 生成更新摘要

---

## 📁 文件结构

```
ecommerce-rag/
├── SKILL.md                       # 本文件
├── QUICKSTART.md                  # 快速开始指南
├── README.md                      # 完整使用指南
├── TAOBAO_API_GUIDE.md            # 淘宝 API 接入指南
├── WEEKLY_UPDATE_GUIDE.md         # 每周更新指南
├── PARAM_EXPLAINER_GUIDE.md       # 参数解释指南
├── PHONE_DATABASE.md              # 手机数据库详情
├── scripts/
│   ├── rag_manager.js             # RAG 库管理
│   ├── search.js                  # 智能搜索
│   ├── param_explainer.js         # 参数解释
│   ├── sales_style.js             # 导购风格
│   ├── phone_compare.js           # 品牌对比
│   ├── weekly_update.js           # 每周更新
│   └── tb_api.js                  # 淘宝 API
└── references/
    ├── products.json              # 商品数据库
    ├── config.json                # 配置
    ├── schema.json                # 数据结构
    └── tb_config.json.example     # 淘宝配置模板
```

---

## ⚠️ 注意事项

1. **数据准确性**: 价格数据来自淘宝 API，可能有延迟
2. **购买建议**: 仅供参考，实际购买请核实最新信息
3. **佣金披露**: 如使用推广链接，应告知用户
4. **API 限制**: 淘宝 API 有调用次数限制，避免频繁调用
5. **数据隐私**: 不要泄露用户搜索和购买记录

---

## 🆘 故障排查

### 问题 1: 搜索结果为空

**原因**: 关键词不匹配  
**解决**: 尝试更通用的关键词，如"手机"代替"小米 15"

### 问题 2: 淘宝 API 连接失败

**原因**: 配置错误或密钥过期  
**解决**: 检查 `references/tb_config.json` 配置

### 问题 3: 参数解释不显示

**原因**: 参数不在解释表中  
**解决**: 在 `param_explainer.js` 中添加新参数

### 问题 4: 更新脚本报错

**原因**: 依赖缺失或权限问题  
**解决**: 检查 Node.js 版本，确保有文件读写权限

---

## 📞 获取帮助

| 资源 | 链接 |
|------|------|
| 快速开始 | `QUICKSTART.md` |
| 淘宝 API | `TAOBAO_API_GUIDE.md` |
| 每周更新 | `WEEKLY_UPDATE_GUIDE.md` |
| 参数解释 | `PARAM_EXPLAINER_GUIDE.md` |
| 淘宝联盟 | https://pub.alimama.com/ |
| 淘宝开放平台 | https://open.taobao.com/ |

---

## 🎯 扩展方向

- [ ] 添加更多品类（耳机/平板/手表/笔记本）
- [ ] 接入京东/拼多多 API
- [ ] 用户偏好学习（记住用户喜好）
- [ ] 价格预测（预测何时入手最划算）
- [ ] 评测整合（自动抓取专业评测）
- [ ] 二手价格参考
- [ ] 以旧换新估价

---

**Skill 版本**: 1.0  
**最后更新**: 2026-04-26  
**维护者**: AI Assistant
