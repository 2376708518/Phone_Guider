# 电商平台 API 文档

## 淘宝联盟 (淘宝客)

- **官网**: https://pub.alimama.com/
- **API 文档**: https://open.taobao.com/doc.htm
- **申请流程**:
  1. 注册淘宝联盟账号
  2. 创建应用获取 app_key 和 app_secret
  3. 设置推广位 (adzone_id)
  4. 调用商品搜索 API

### 核心 API
- `taobao.tbk.dg.material.optional` - 商品搜索
- `taobao.tbk.item.info.get` - 商品详情
- `taobao.tbk.coupon.get` - 优惠券查询

---

## 京东联盟

- **官网**: https://union.jd.com/
- **API 文档**: https://union.jd.com/open/platform
- **申请流程**:
  1. 注册京东联盟账号
  2. 创建应用获取密钥
  3. 申请推广权限

### 核心 API
- `jd.union.open.goods.search` - 商品搜索
- `jd.union.open.goods.priceservice.get` - 价格查询
- `jd.union.open.coupon.query` - 优惠券查询

---

## 拼多多开放平台

- **官网**: https://open.pinduoduo.com/
- **API 文档**: https://open.pinduoduo.com/document
- **申请流程**:
  1. 注册拼多多商家/开发者账号
  2. 创建应用获取 client_id 和 client_secret
  3. 申请商品数据权限

### 核心 API
- `pdd.ddk.goods.search` - 商品搜索
- `pdd.ddk.goods.detail` - 商品详情
- `pdd.ddk.coupon_info` - 优惠券信息

---

## 其他数据源

### 什么值得买
- **网站**: https://www.smzdm.com/
- **用途**: 优惠信息、用户评测
- **方式**: 网页抓取 (无官方 API)

### 历史价格查询
- **慢慢买**: https://www.manmanbuy.com/
- **惠惠购物助手**: 已停止服务
- **方式**: 网页抓取

---

## 注意事项

1. **API 调用限制**: 各平台都有调用频率限制，注意遵守
2. **佣金政策**: 通过联盟链接购买可获得佣金
3. **数据缓存**: 建议缓存搜索结果，减少 API 调用
4. **合规使用**: 遵守各平台服务条款，不要滥用

---

## 开发建议

### 第一阶段 (无 API)
- 使用 `agent-browser` skill 进行网页抓取
- 支持基本搜索和比价功能
- 适合个人使用和测试

### 第二阶段 (接入 API)
- 申请各平台 API 权限
- 替换网页抓取为官方 API
- 提高稳定性和数据质量

### 第三阶段 (高级功能)
- 历史价格追踪
- 降价提醒 (cron 定时任务)
- 用户偏好学习
- 个性化推荐
