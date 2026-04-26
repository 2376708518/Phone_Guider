# 🛒 淘宝 API 接入指南

## 📋 前置条件

### 1. 申请淘宝联盟账号

**网址**: https://pub.alimama.com/

**流程**:
1. 用淘宝账号登录
2. 完成实名认证
3. 等待审核（通常 1-2 个工作日）

### 2. 创建应用

**步骤**:
1. 登录后进入「开发者中心」
2. 点击「创建应用」
3. 选择应用类型：**网站应用** 或 **APP 应用**
4. 填写应用信息：
   - 应用名称：电商导购助手
   - 应用描述：商品搜索和价格比较
   - 网站域名：localhost（本地开发）
5. 提交审核

### 3. 获取密钥

应用审核通过后：
- **app_key**: 应用 Key
- **app_secret**: 应用密钥（妥善保管）
- **adzone_id**: 推广位 ID（用于生成推广链接）

---

## 🔧 配置方法

### 方式 1：使用配置工具

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag
node scripts/tb_api.js config
```

按提示输入：
- app_key
- app_secret
- adzone_id

### 方式 2：手动编辑配置文件

复制示例配置：
```bash
cp references/tb_config.json.example references/tb_config.json
```

编辑 `references/tb_config.json`:
```json
{
  "app_key": "你的 app_key",
  "app_secret": "你的 app_secret",
  "adzone_id": "你的 adzone_id"
}
```

---

## ✅ 测试连接

```bash
node scripts/tb_api.js test
```

成功输出：
```
✅ 淘宝 API 连接成功
   测试商品：iPhone 16 Pro Max
   价格：¥9999
```

---

## 🚀 使用功能

### 1. 搜索商品

```bash
node scripts/tb_api.js search 小米手机
```

输出：
```
🔍 搜索淘宝商品：小米手机

✅ 找到 5 个商品

1. 小米 15 Pro 12GB+256GB
   💰 ¥5299 (天猫)
   📊 月销 50000+
   🔗 https://detail.tmall.com/item.htm?id=xxx

2. 小米 14 12GB+256GB
   💰 ¥3699 (天猫)
   📊 月销 100000+
   🔗 https://detail.tmall.com/item.htm?id=xxx
```

### 2. 在代码中使用

```javascript
const tbApi = require('./tb_api.js');

// 加载配置
tbApi.loadConfig();

// 搜索商品
const products = await tbApi.searchProducts('小米手机', {
  limit: 10,
  min_price: 3000,
  max_price: 6000
});

// 获取商品详情
const details = await tbApi.getProductDetail(['123456789']);

// 获取优惠券
const coupon = await tbApi.getCoupon('material_id');
```

---

## 📊 API 说明

### 商品搜索 API

**方法**: `taobao.tbk.dg.material.optional`

**参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| q | string | 是 | 搜索关键词 |
| page_size | int | 否 | 每页数量（默认 20，最大 100） |
| page_no | int | 否 | 页码（默认 1） |
| start_price | float | 否 | 最低价格 |
| end_price | float | 否 | 最高价格 |
| sort | int | 否 | 排序（1 综合/2 销量/3 价格升序/4 价格降序） |
| adzone_id | string | 是 | 推广位 ID |

**返回字段**:
- `title`: 商品标题
- `zk_final_price`: 折后价
- `reserve_price`: 原价
- `month_sales`: 月销量
- `pict_url`: 主图 URL
- `click_url`: 推广链接
- `commission_rate`: 佣金比例
- `user_type`: 店铺类型（1=天猫/0=淘宝）

### 商品详情 API

**方法**: `taobao.tbk.item.info.get`

**参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| num_iids | string | 是 | 商品 ID 列表（逗号分隔） |
| adzone_id | string | 是 | 推广位 ID |

### 优惠券 API

**方法**: `taobao.tbk.coupon.get`

**参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ad_material_id | string | 是 | 素材 ID |
| adzone_id | string | 是 | 推广位 ID |

---

## ⚠️ 注意事项

### 1. API 调用限制

| 等级 | 日调用量 | QPS |
|------|---------|-----|
| 普通 | 1000 次 | 10 次/秒 |
| 中级 | 10000 次 | 50 次/秒 |
| 高级 | 100000 次 | 100 次/秒 |

**建议**:
- 添加缓存机制
- 避免频繁调用
- 批量查询代替单个查询

### 2. 数据安全

- **不要**将 `app_secret` 提交到 git
- **不要**在前端代码中暴露密钥
- **建议**使用环境变量存储密钥

### 3. 佣金规则

- 不同类目佣金不同（通常 1%-10%）
- 需要用户通过推广链接购买才能获得佣金
- 订单完成后次月结算

---

## 🔧 集成到每周更新

配置好淘宝 API 后，每周更新会自动使用真实价格：

```bash
# 运行每周更新
node scripts/weekly_update.js
```

更新内容：
1. ✅ 数据备份
2. ✅ **淘宝价格检查**（真实 API）
3. 🔄 新品添加（需配置新品源）
4. 🔄 下架检测（需配置状态 API）
5. ✅ 统计报告

---

## 📋 常见问题

### Q1: 应用审核不通过？
**A**: 确保填写的应用信息真实完整，域名可以填 localhost 用于本地开发。

### Q2: API 调用失败？
**A**: 检查：
- app_key 和 app_secret 是否正确
- 网络是否正常
- 是否超过调用限制

### Q3: 搜索结果为空？
**A**: 尝试：
- 更换关键词
- 检查价格区间是否合理
- 确认 adzone_id 是否正确

### Q4: 如何获取更高调用限额？
**A**: 提升应用等级：
- 增加应用活跃度
- 提高推广效果（GMV）
- 联系淘宝联盟申请

---

## 🎯 下一步

### 已实现
- ✅ 商品搜索
- ✅ 价格检查
- ✅ 商品详情
- ✅ 优惠券查询

### 待实现
- [ ] 新品自动发现
- [ ] 下架商品检测
- [ ] 历史价格记录
- [ ] 价格趋势分析
- [ ] 邮件/消息通知

---

## 📞 获取帮助

- **淘宝联盟官网**: https://pub.alimama.com/
- **API 文档**: https://open.taobao.com/doc.htm
- **开发者论坛**: https://open.taobao.com/forum

---

**配置完成后，运行一次测试确保一切正常！** 🦞
