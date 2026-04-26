# 📅 每周自动更新指南

## 🎯 功能说明

`weekly_update.js` 脚本提供以下功能：

| 功能 | 说明 | 状态 |
|------|------|------|
| **数据备份** | 更新前自动备份数据 | ✅ |
| **价格检查** | 检测价格变化（>5%） | 🔄 需接入真实 API |
| **新品添加** | 添加新发布机型 | 🔄 需接入新品源 |
| **下架检测** | 标记下架商品 | 🔄 需接入状态 API |
| **统计报告** | 生成更新摘要和统计 | ✅ |

---

## 🚀 使用方法

### 手动运行

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag
node scripts/weekly_update.js
```

### 定时任务（推荐）

#### 方式 1：使用 cron（Linux/Mac）

编辑 crontab：
```bash
crontab -e
```

添加以下行（每周日早上 8 点运行）：
```
0 8 * * 0 cd /home/admin/.openclaw/workspace/skills/ecommerce-rag && node scripts/weekly_update.js
```

#### 方式 2：使用 OpenClaw cron

```javascript
// 在 OpenClaw 中设置
cron add {
  "name": "电商 RAG 库每周更新",
  "schedule": {
    "kind": "cron",
    "expr": "0 8 * * 0",
    "tz": "Asia/Shanghai"
  },
  "payload": {
    "kind": "systemEvent",
    "text": "运行电商 RAG 库每周更新：cd /home/admin/.openclaw/workspace/skills/ecommerce-rag && node scripts/weekly_update.js"
  }
}
```

---

## 📊 更新报告

每次更新会生成报告文件：
```
data/weekly_update_YYYY-MM-DD.json
```

报告内容：
```json
{
  "timestamp": "2026-04-26T21:21:41.000Z",
  "priceUpdates": [],      // 价格变化列表
  "newProducts": [],       // 新增商品列表
  "discontinued": [],      // 下架商品列表
  "stats": {               // 统计信息
    "total": 68,
    "byBrand": {...},
    "byPriceRange": {...},
    "avgPrice": 5194
  }
}
```

---

## 📁 数据备份

每次更新前自动备份到：
```
data/backups/products_backup_时间戳.json
```

恢复备份：
```bash
cp data/backups/products_backup_时间戳.json references/products.json
```

---

## 🔧 配置说明

在 `weekly_update.js` 中修改配置：

```javascript
const CONFIG = {
  // 价格变动阈值（超过 5% 才记录）
  priceChangeThreshold: 0.05,
  
  // 最大价格检查数量
  maxPriceCheck: 20,
  
  // 新品检查品牌
  newProductsBrands: ['小米', '华为', 'OPPO', 'vivo', '荣耀'],
  
  // 数据备份
  backupEnabled: true,
  backupDir: './data/backups'
};
```

---

## 🔄 接入真实数据源

### 1. 价格检查

当前是模拟价格波动，需要接入真实 API：

```javascript
// 示例：调用电商 API 获取真实价格
async function getRealPrice(product) {
  // 调用淘宝/京东/拼多多 API
  const response = await fetch(`https://api.example.com/price?product_id=${product.id}`);
  const data = await response.json();
  return data.price;
}
```

### 2. 新品添加

当前是模拟新品，需要接入新品源：

```javascript
// 示例：爬取品牌官网新品
async function fetchNewProducts() {
  const brands = ['小米', '华为', 'OPPO'];
  const newProducts = [];
  
  for (const brand of brands) {
    // 爬取品牌官网或电商平台新品页面
    const products = await scrapeBrandNewProducts(brand);
    newProducts.push(...products);
  }
  
  return newProducts;
}
```

### 3. 下架检测

```javascript
// 示例：检查商品状态
async function checkProductStatus(product) {
  const status = await fetchProductStatus(product.product_url);
  return status === 'sold_out' ? '下架' : '在售';
}
```

---

## 📋 更新日志

### 2026-04-26
- ✅ 初始版本
- ✅ 数据备份功能
- ✅ 模拟价格检查
- ✅ 模拟新品添加
- ✅ 统计报告生成

### 待优化
- [ ] 接入真实价格 API
- [ ] 接入新品发布源
- [ ] 下架商品自动检测
- [ ] 邮件/消息通知更新结果
- [ ] 价格历史趋势分析

---

## 💡 最佳实践

### 1. 定期运行
- **频率**：每周一次（建议周日）
- **时间**：早上 8 点（电商活动较少）

### 2. 检查报告
每次更新后查看报告：
- 价格变化是否合理
- 新品信息是否准确
- 统计数据是否正常

### 3. 保留备份
- 至少保留最近 4 次备份
- 大更新前手动备份一次

### 4. 监控异常
注意以下情况：
- 价格变化过大（>50%）
- 大量商品下架
- 数据文件损坏

---

## 🎯 运行示例

```
╔══════════════════════════════════════════════════════════╗
║         电商 RAG 库 - 每周自动更新                        ║
╚══════════════════════════════════════════════════════════╝

📅 更新时间：2026/4/26 21:21:41

✅ 数据备份完成
📊 检查价格变化...
   发现 3 个价格变化
🆕 检查新品发布...
   添加 2 款新品
📦 检查下架商品...
   发现 1 款商品下架
📊 生成统计报告...
   商品总数：68
   平均价格：¥5194
✅ 更新报告已保存

🎉 每周更新完成！
```

---

## 📞 故障排查

### 问题 1：备份失败
**原因**：目录不存在  
**解决**：手动创建 `data/backups` 目录

### 问题 2：数据损坏
**原因**：JSON 格式错误  
**解决**：从备份恢复

### 问题 3：更新无变化
**原因**：模拟数据波动小  
**解决**：接入真实 API

---

**建议**：每周查看一次更新报告，确保数据质量！🦞
