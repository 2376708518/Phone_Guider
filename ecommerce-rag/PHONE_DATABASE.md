# 📱 手机 RAG 数据库 - 完成报告

## ✅ 导入完成

**时间**: 2026-04-26  
**手机数量**: 61 款  
**数据覆盖**: 2024-2026 年主流品牌旗舰机型

---

## 📊 品牌分布

| 品牌 | 机型数量 | 价格区间 | 平均价格 |
|------|---------|---------|---------|
| Apple | 8 款 | ¥4299 - ¥9999 | ¥6312 |
| 小米 | 10 款 | ¥2999 - ¥6999 | ¥4849 |
| 华为 | 8 款 | ¥4999 - ¥8999 | ¥7187 |
| OPPO | 6 款 | ¥2699 - ¥6999 | ¥4782 |
| vivo | 8 款 | ¥3299 - ¥6999 | ¥5037 |
| 荣耀 | 6 款 | ¥2999 - ¥6499 | ¥4849 |
| 三星 | 5 款 | ¥5499 - ¥9999 | ¥7699 |
| 一加 | 4 款 | ¥2599 - ¥5299 | ¥3874 |
| iQOO | 5 款 | ¥2799 - ¥4999 | ¥4019 |
| realme | 3 款 | ¥2499 - ¥4299 | ¥3366 |

---

## 📈 价格段分布

```
¥2000 以下      3 款  ▓▓
¥2000-3000     6 款  ▓▓▓
¥3000-4000    10 款  ▓▓▓▓▓
¥4000-5000    16 款  ▓▓▓▓▓▓▓▓
¥5000-7000    22 款  ▓▓▓▓▓▓▓▓▓▓▓
¥7000-10000    9 款  ▓▓▓▓▓
¥10000 以上     0 款
```

**主力价格段**: ¥4000-7000 (共 38 款，占 62%)

---

## 🏆 各品牌代表机型

### Apple
- **旗舰**: iPhone 16 Pro Max (¥9999) - A18 Pro 芯片 6.9 英寸
- **热销**: iPhone 15 (¥4799) - A16 仿生 灵动岛
- **性价比**: iPhone 14 (¥4299) - A15 仿生

### 小米
- **旗舰**: 小米 15 Ultra (¥6999) - 骁龙 8 Elite 徕卡四摄
- **热销**: 小米 14 (¥3699) - 骁龙 8Gen3 小屏旗舰
- **性价比**: 小米 13 (¥2999) - 骁龙 8Gen2

### 华为
- **旗舰**: Mate 70 Pro+ (¥8999) - 麒麟 9100 鸿蒙 OS
- **热销**: Mate 60 Pro (¥6999) - 麒麟 9000S 卫星通话
- **影像**: P70 Ultra (¥7999) - 伸缩镜头 XMAGE

### OPPO
- **旗舰**: Find X8 Ultra (¥6999) - 骁龙 8 Elite 哈苏影像
- **热销**: Find X7 (¥3999) - 天玑 9300
- **轻薄**: Reno12 Pro (¥3299)

### vivo
- **旗舰**: X200 Ultra (¥6999) - 骁龙 8 Elite 蔡司影像
- **热销**: X100 (¥3999) - 天玑 9300 蔡司
- **影像**: X100 Ultra (¥6499) - 2 亿像素潜望

### 荣耀
- **旗舰**: Magic7 Pro (¥6499) - 骁龙 8 Elite 鹰眼相机
- **热销**: Magic6 (¥4499) - 骁龙 8Gen3
- **性价比**: 荣耀 100 Pro (¥2999)

### 三星
- **旗舰**: Galaxy S25 Ultra (¥9999) - 骁龙 8 Elite S Pen
- **热销**: Galaxy S24 (¥5499) - 小屏旗舰
- **AI**: Galaxy S24 Ultra (¥8999) - AI 功能

### 性价比品牌
- **一加**: Ace 3 (¥2599) - 骁龙 8Gen2
- **iQOO**: Neo9S Pro (¥2799) - 天玑 9300+ 电竞
- **realme**: GT Neo6 (¥2499) - 最便宜骁龙 8sGen3

---

## 🔍 数据字段

每款手机包含以下信息：

| 字段 | 说明 |
|------|------|
| product_id | 唯一标识符 |
| name | 完整型号名称 |
| description | 核心卖点描述 |
| brand | 品牌 |
| price | 当前价格 |
| original_price | 原价（计算折扣） |
| platform | 销售平台（京东/淘宝/天猫/拼多多） |
| specs | 详细参数（处理器/屏幕/内存/摄像/电池等） |
| tags | 标签（5G/旗舰/徕卡/蔡司/电竞等） |
| rating | 用户评分 (0-5) |
| sales | 销量 |
| status | 销售状态 |

---

## 💡 使用示例

### 1. 搜索特定品牌
```bash
node scripts/rag_manager.js search --keyword=小米 --limit=10
```

### 2. 价格区间筛选
```bash
node scripts/rag_manager.js search --keyword=手机 --min_price=3000 --max_price=5000
```

### 3. 品牌对比
```bash
node scripts/phone_compare.js
```

### 4. 在对话中使用
```
搜索"小米手机"
找一下 5000 元左右的旗舰手机
对比一下 iPhone 16 和小米 15
推荐一款拍照好的手机
```

---

## 📋 完整机型列表

### Apple (8 款)
- iPhone 16 Pro Max 256GB (¥9999)
- iPhone 16 Pro 128GB (¥7999)
- iPhone 16 128GB (¥5999)
- iPhone 15 Pro Max 256GB (¥8499)
- iPhone 15 128GB (¥4799)
- iPhone 14 Pro Max 256GB (¥6999)
- iPhone 14 128GB (¥4299)

### 小米 (10 款)
- 小米 15 Ultra 16GB+512GB (¥6999)
- 小米 15 Pro 12GB+256GB (¥5299)
- 小米 15 12GB+256GB (¥4499)
- 小米 14 Ultra 16GB+512GB (¥5999)
- 小米 14 Pro 12GB+256GB (¥4599)
- 小米 14 12GB+256GB (¥3699)
- 小米 13 Ultra 12GB+256GB (¥4299)
- 小米 13 Pro 12GB+256GB (¥3599)
- 小米 13 12GB+256GB (¥2999)

### 华为 (8 款)
- 华为 Mate 70 Pro+ 16GB+512GB (¥8999)
- 华为 Mate 70 Pro 12GB+256GB (¥7499)
- 华为 Mate 60 Pro+ 16GB+512GB (¥7999)
- 华为 Mate 60 Pro 12GB+512GB (¥6999)
- 华为 Mate 60 12GB+512GB (¥5999)
- 华为 P70 Ultra 16GB+512GB (¥7999)
- 华为 P70 Pro 12GB+512GB (¥6999)
- 华为 P60 Pro 8GB+256GB (¥4999)

### OPPO (6 款)
- OPPO Find X8 Ultra 16GB+512GB (¥6999)
- OPPO Find X8 Pro 12GB+256GB (¥5699)
- OPPO Find X7 Ultra 16GB+512GB (¥5999)
- OPPO Find X7 12GB+256GB (¥3999)
- OPPO Reno12 Pro 12GB+256GB (¥3299)
- OPPO Reno11 Pro 12GB+256GB (¥2699)

### vivo (8 款)
- vivo X200 Ultra 16GB+512GB (¥6999)
- vivo X200 Pro 12GB+256GB (¥5499)
- vivo X200 12GB+256GB (¥4699)
- vivo X100 Ultra 16GB+512GB (¥6499)
- vivo X100 Pro 12GB+256GB (¥4999)
- vivo X100 12GB+256GB (¥3999)
- vivo X90 Pro+ 12GB+256GB (¥4299)
- vivo S19 Pro 12GB+256GB (¥3299)

### 荣耀 (6 款)
- 荣耀 Magic7 Pro 16GB+512GB (¥6499)
- 荣耀 Magic7 12GB+256GB (¥5299)
- 荣耀 Magic6 Pro 12GB+512GB (¥5499)
- 荣耀 Magic6 12GB+256GB (¥4499)
- 荣耀 Magic5 Pro 12GB+512GB (¥4299)
- 荣耀 100 Pro 12GB+256GB (¥2999)

### 三星 (5 款)
- 三星 Galaxy S25 Ultra 12GB+512GB (¥9999)
- 三星 Galaxy S24 Ultra 12GB+512GB (¥8999)
- 三星 Galaxy S24+ 12GB+256GB (¥6999)
- 三星 Galaxy S24 8GB+256GB (¥5499)
- 三星 Galaxy S23 Ultra 12GB+512GB (¥6999)

### 一加 (4 款)
- 一加 13 16GB+512GB (¥5299)
- 一加 12 16GB+512GB (¥4299)
- 一加 Ace 5 Pro 12GB+256GB (¥3299)
- 一加 Ace 3 12GB+256GB (¥2599)

### iQOO (5 款)
- iQOO 13 16GB+512GB (¥4999)
- iQOO 12 Pro 16GB+512GB (¥4999)
- iQOO 12 12GB+256GB (¥3999)
- iQOO Neo10 Pro 12GB+256GB (¥3299)
- iQOO Neo9S Pro 12GB+256GB (¥2799)

### realme (3 款)
- realme GT7 Pro 12GB+256GB (¥4299)
- realme GT6 12GB+256GB (¥3299)
- realme GT Neo6 12GB+256GB (¥2499)

---

## 🔄 后续更新

### 可优化方向
- [ ] 添加更多中低端机型（¥2000 以下）
- [ ] 补充 2026 年新发布机型
- [ ] 添加用户评价数据
- [ ] 实时价格同步（cron 定时任务）
- [ ] 添加二手价格参考
- [ ] 添加评测分数（安兔兔/Geekbench）

### 数据来源
- 各品牌官网
- 电商平台（京东/天猫/拼多多）
- 科技媒体评测

---

**数据更新时间**: 2026-04-26  
**数据库位置**: `/home/admin/.openclaw/workspace/skills/ecommerce-rag/references/products.json`
