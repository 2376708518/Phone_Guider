# 电商导购助手 Skill

电商商品搜索、比价、推荐工具。支持多平台商品查询和价格比较。

## 触发场景

当用户提到以下关键词时触发此 Skill：
- "帮我找商品"、"推荐商品"、"买什么好"
- "比价"、"哪个平台便宜"、"哪里买划算"
- "淘宝"、"京东"、"拼多多"、"电商"
- "优惠券"、"促销"、"折扣"
- "商品评价"、"销量"、"排行榜"

## 核心功能

### 1. 商品搜索 (`search_product`)
在指定平台搜索商品，返回商品列表（标题、价格、销量、链接）

### 2. 价格比较 (`compare_prices`)
跨平台比较同一商品的价格

### 3. 商品推荐 (`recommend_products`)
根据用户需求生成推荐清单

### 4. 历史价格查询 (`price_history`)
查询商品历史价格走势（如支持）

### 5. 优惠券查找 (`find_coupons`)
查找可用优惠券和促销活动

## 使用方法

```bash
# 搜索商品
ecommerce-guide search_product --keyword "无线耳机" --platform taobao

# 比价
ecommerce-guide compare_prices --keyword "iPhone 15"

# 推荐
ecommerce-guide recommend_products --category "数码" --budget 500
```

## 配置说明

### API 配置（可选）

在 `references/config.json` 中配置各平台 API：

```json
{
  "taobao": {
    "app_key": "your_app_key",
    "app_secret": "your_app_secret"
  },
  "jd": {
    "app_key": "your_app_key",
    "app_secret": "your_app_secret"
  },
  "pdd": {
    "client_id": "your_client_id",
    "client_secret": "your_client_secret"
  }
}
```

### 无 API 模式

如未配置 API，自动使用网页抓取模式（通过 agent-browser skill）

## 依赖技能

- `agent-browser` - 网页抓取（无 API 时）
- `searxng` - 搜索优惠信息
- `ecommerce-rag` - 商品 RAG 库（优先从库中检索）

## 注意事项

1. 各平台 API 需要单独申请（淘宝客、京东联盟、拼多多开放平台）
2. 网页抓取模式速度较慢，建议配置 API
3. 遵守各平台 robots.txt 和使用条款
4. 不要高频请求，避免被封 IP

## 文件结构

```
ecommerce-guide/
├── SKILL.md              # 本文件
├── scripts/
│   ├── search.js         # 商品搜索
│   ├── compare.js        # 价格比较
│   ├── recommend.js      # 商品推荐
│   └── utils.js          # 工具函数
└── references/
    ├── config.json       # API 配置
    └── platforms.md      # 各平台 API 文档链接
```

## 扩展方向

- [ ] 物流跟踪
- [ ] 降价提醒（cron 定时任务）
- [ ] 用户偏好学习
- [ ] 购物清单管理
- [ ] 订单管理
