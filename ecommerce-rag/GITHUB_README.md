# 🛒 电商导购助手 Skill

智能电商导购助手，提供商品搜索、价格比较、参数解释、购买推荐等服务。内置 68+ 款手机数据，支持淘宝 API 实时价格更新。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14-green.svg)
![Skills](https://img.shields.io/badge/platform-OpenClaw-orange.svg)

---

## ✨ 特性

- 📦 **68+ 款商品数据** - 覆盖 10 个主流品牌，价格区间 ¥2499-¥9999
- 🔍 **智能搜索** - 支持关键词、价格区间、品牌、平台等多条件筛选
- 💬 **真实导购风格** - 温柔理性，不硬推销，像线下导购一样
- 📊 **参数形象化** - 把技术参数翻译成生活场景（如"刷抖音 15 小时"）
- 🔄 **自动更新** - 每周自动检查价格变化和新品
- 🛒 **淘宝 API** - 支持接入淘宝联盟获取真实价格和优惠券
- 📱 **品牌对比** - 全方位对比各品牌特点和优势
- 🎯 **智能推荐** - 根据预算、使用场景、偏好生成推荐

---

## 🚀 快速开始

### 前置条件

- Node.js >= 14
- OpenClaw 运行环境
- （可选）淘宝联盟账号（用于真实价格）

### 安装

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/ecommerce-rag.git
cd ecommerce-rag

# 安装依赖（如有）
npm install
```

### 配置

#### 1. 基础配置（可选）

编辑 `references/config.json`:

```json
{
  "rag": {
    "type": "local",
    "data_file": "./references/products.json",
    "max_items": 10000
  }
}
```

#### 2. 淘宝 API 配置（可选）

```bash
# 复制配置模板
cp references/tb_config.json.example references/tb_config.json

# 编辑配置，填入你的淘宝联盟密钥
# 申请地址：https://pub.alimama.com/
```

### 使用

#### 方式 1: 在 OpenClaw 对话中使用

直接对 AI 说：
```
"预算 4000 左右，帮我推荐个手机"
"想要拍照好的手机"
"对比一下 iPhone 16 和小米 15"
```

#### 方式 2: 命令行使用

```bash
# 搜索商品
node scripts/rag_manager.js search --keyword=小米 --limit=5

# 品牌对比
node scripts/phone_compare.js

# 参数解释
node scripts/param_explainer.js

# 每周更新
node scripts/weekly_update.js
```

#### 方式 3: 代码调用

```javascript
const { searchProducts } = require('./scripts/rag_manager.js');
const { explainParams } = require('./scripts/param_explainer.js');

// 搜索
const products = searchProducts({ 
  keyword: '小米', 
  max_price: 4000,
  limit: 5 
});

// 参数解释
const explanation = explainParams('battery', '6000mAh');
```

---

## 📊 功能演示

### 商品搜索

```bash
$ node scripts/rag_manager.js search --keyword=小米 --limit=3
```

输出：
```
🔍 找到 3 个商品

1. 小米 15 12GB+256GB - ¥4499
   骁龙 8 Elite | 5400mAh | 徕卡三摄

2. 小米 15 Pro 12GB+256GB - ¥5299
   骁龙 8 Elite | 6100mAh | 徕卡三摄

3. 小米 14 12GB+256GB - ¥3699
   骁龙 8Gen3 | 4610mAh | 徕卡三摄
```

### 参数解释

```bash
$ node scripts/param_explainer.js
```

输出：
```
🔋 电池：6000mAh【超大电池】
   重度使用一天半，轻度两天
   刷抖音 15 小时/打游戏 8 小时/待机 3 天
```

### 品牌对比

```bash
$ node scripts/phone_compare.js
```

输出各品牌价格区间、代表机型、购买建议。

---

## 📁 项目结构

```
ecommerce-rag/
├── scripts/                        # 核心脚本
│   ├── rag_manager.js              # RAG 库管理
│   ├── search.js                   # 智能搜索
│   ├── param_explainer.js          # 参数解释
│   ├── sales_style.js              # 导购风格
│   ├── phone_compare.js            # 品牌对比
│   ├── weekly_update.js            # 每周更新
│   ├── tb_api.js                   # 淘宝 API
│   └── import_phones.js            # 批量导入
├── references/                     # 配置和数据
│   ├── products.json               # 商品数据库
│   ├── config.json                 # RAG 配置
│   ├── schema.json                 # 数据结构
│   └── tb_config.json.example      # 淘宝配置模板
├── data/                           # 运行时数据（不上传）
│   ├── backups/                    # 自动备份
│   └── weekly_update_*.json        # 更新报告
├── docs/                           # 文档
│   ├── QUICKSTART.md               # 快速开始
│   ├── TAOBAO_API_GUIDE.md         # 淘宝 API 指南
│   ├── WEEKLY_UPDATE_GUIDE.md      # 每周更新指南
│   └── PARAM_EXPLAINER_GUIDE.md    # 参数解释指南
├── SKILL.md                        # Skill 定义
├── README.md                       # 本文件
├── LICENSE                         # MIT 许可证
└── .gitignore                      # Git 忽略文件
```

---

## 🎯 使用场景

| 场景 | 示例 | 命令/对话 |
|------|------|-----------|
| 预算选购 | "预算 4000 左右推荐手机" | 对话 |
| 商品搜索 | "查找小米手机" | `search --keyword=小米` |
| 价格比较 | "对比 iPhone 16 和小米 15" | `phone_compare.js` |
| 参数咨询 | "6000mAh 电池怎么样" | `param_explainer.js` |
| 品牌对比 | "小米和华为哪个好" | `phone_compare.js` |
| 数据更新 | "更新价格和新品" | `weekly_update.js` |

---

## 🔧 配置说明

### 淘宝 API 配置

1. 访问 https://pub.alimama.com/ 注册淘宝联盟
2. 创建应用获取 `app_key` 和 `app_secret`
3. 编辑 `references/tb_config.json`:

```json
{
  "app_key": "你的 app_key",
  "app_secret": "你的 app_secret",
  "adzone_id": "你的 adzone_id"
}
```

4. 测试连接：`node scripts/tb_api.js test`

详细指南：[TAOBAO_API_GUIDE.md](docs/TAOBAO_API_GUIDE.md)

### 定时更新

设置每周自动更新（每周日早上 8 点）：

```bash
crontab -e
# 添加：
0 8 * * 0 cd /path/to/ecommerce-rag && node scripts/weekly_update.js
```

---

## 📊 商品数据

### 品牌覆盖

| 品牌 | 机型数 | 价格区间 |
|------|--------|----------|
| Apple | 8 款 | ¥4299-¥9999 |
| 小米 | 11 款 | ¥2999-¥6999 |
| 华为 | 8 款 | ¥4999-¥8999 |
| OPPO | 6 款 | ¥2699-¥6999 |
| vivo | 9 款 | ¥3299-¥6999 |
| 荣耀 | 6 款 | ¥2999-¥6499 |
| 三星 | 5 款 | ¥5499-¥9999 |
| 一加 | 4 款 | ¥2599-¥5299 |
| iQOO | 5 款 | ¥2799-¥4999 |
| realme | 3 款 | ¥2499-¥4299 |

### 价格段分布

```
¥2000 以下      3 款  ▓▓
¥2000-3000     6 款  ▓▓▓
¥3000-4000    10 款  ▓▓▓▓▓
¥4000-5000    16 款  ▓▓▓▓▓▓▓▓
¥5000-7000    22 款  ▓▓▓▓▓▓▓▓▓▓▓
¥7000-10000    9 款  ▓▓▓▓▓
```

---

## 🧪 测试

```bash
# 运行测试（如有测试套件）
npm test

# 或手动测试
node scripts/rag_manager.js stats
node scripts/phone_compare.js
```

---

## 📖 文档

| 文档 | 说明 |
|------|------|
| [QUICKSTART.md](docs/QUICKSTART.md) | 5 分钟快速开始 |
| [SKILL.md](SKILL.md) | 完整 Skill 定义 |
| [TAOBAO_API_GUIDE.md](docs/TAOBAO_API_GUIDE.md) | 淘宝 API 接入指南 |
| [WEEKLY_UPDATE_GUIDE.md](docs/WEEKLY_UPDATE_GUIDE.md) | 每周更新设置 |
| [PARAM_EXPLAINER_GUIDE.md](docs/PARAM_EXPLAINER_GUIDE.md) | 参数解释规则 |

---

## ⚠️ 注意事项

1. **敏感信息**: 不要将 `tb_config.json` 等包含密钥的文件提交到 Git
2. **数据准确性**: 价格数据可能有延迟，实际购买请核实最新信息
3. **API 限制**: 淘宝 API 有调用次数限制，避免频繁调用
4. **佣金披露**: 如使用推广链接，应告知用户
5. **数据隐私**: 不要泄露用户搜索和购买记录

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 📞 联系方式

- 项目地址：https://github.com/YOUR_USERNAME/ecommerce-rag
- 问题反馈：https://github.com/YOUR_USERNAME/ecommerce-rag/issues
- OpenClaw: https://openclaw.ai

---

## 🎯 后续计划

- [ ] 添加更多品类（耳机/平板/手表/笔记本）
- [ ] 接入京东/拼多多 API
- [ ] 用户偏好学习
- [ ] 价格预测
- [ ] 评测整合
- [ ] 二手价格参考

---

**如果这个项目对你有帮助，请给个 ⭐ Star！** 🦞
