# 📤 GitHub 部署指南

## ✅ 可以上传的文件

### 核心代码（必须上传）

```
scripts/                    # ✅ 所有脚本文件
├── rag_manager.js
├── search.js
├── param_explainer.js
├── sales_style.js
├── phone_compare.js
├── weekly_update.js
├── tb_api.js
└── import_phones.js

references/                 # ✅ 配置模板和结构
├── config.json             # ✅ RAG 配置（不含密钥）
├── schema.json             # ✅ 数据结构定义
└── tb_config.json.example  # ✅ 配置模板（示例）

docs/                       # ✅ 所有文档
├── QUICKSTART.md
├── TAOBAO_API_GUIDE.md
├── WEEKLY_UPDATE_GUIDE.md
└── PARAM_EXPLAINER_GUIDE.md

SKILL.md                    # ✅ Skill 定义
README.md                   # ✅ 项目说明
LICENSE                     # ✅ 许可证
package.json                # ✅ 项目配置
.gitignore                  # ✅ Git 忽略规则
```

---

## ❌ 不要上传的文件

### 敏感信息

```
references/tb_config.json   # ❌ 包含淘宝 API 密钥
references/*_config.json    # ❌ 其他含密钥的配置
```

### 数据文件（可选）

```
references/products.json    # ⚠️ 商品数据（可上传可不上传）
data/                       # ❌ 运行时数据
data/backups/               # ❌ 备份文件
data/weekly_update_*.json   # ❌ 更新报告
```

### 临时文件

```
node_modules/               # ❌ npm 依赖
*.log                       # ❌ 日志文件
.DS_Store                   # ❌ 系统文件
```

---

## 🚀 上传步骤

### 1. 准备上传

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 检查 .gitignore 是否存在
ls -la .gitignore

# 检查敏感文件是否被忽略
cat .gitignore
```

### 2. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `ecommerce-rag-skill`
   - **Description**: 智能电商导购助手 Skill
   - **Visibility**: Public（公开）或 Private（私有）
   - **不要**勾选 "Add README"（我们已有）
   - **不要**勾选 ".gitignore"（我们已有）
   - **不要**选择 License（我们已有）

3. 点击 "Create repository"

### 3. 上传代码

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 检查状态（确认没有敏感文件）
git status

# 提交
git commit -m "Initial commit: 电商导购助手 Skill v1.0"

# 关联远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-rag-skill.git

# 推送
git push -u origin main
```

### 4. 验证上传

访问你的 GitHub 仓库，确认：
- ✅ 所有脚本文件已上传
- ✅ 文档文件已上传
- ✅ 配置文件（不含密钥）已上传
- ❌ **没有** `tb_config.json` 等敏感文件

---

## 📋 上传后检查清单

### 文件检查

- [ ] `scripts/` 目录完整（8 个文件）
- [ ] `references/` 目录有配置模板
- [ ] `docs/` 目录有文档
- [ ] `SKILL.md` 已上传
- [ ] `README.md` 已上传
- [ ] `LICENSE` 已上传
- [ ] `package.json` 已上传
- [ ] `.gitignore` 已上传
- [ ] **没有** `tb_config.json`
- [ ] **没有** `data/` 目录

### 功能检查

- [ ] README 中的链接正确
- [ ] 文档中的路径正确
- [ ] 示例命令可运行
- [ ] 许可证信息正确

---

## 🔒 安全建议

### 1. 使用环境变量（推荐）

创建 `.env.example`:

```bash
# 淘宝 API 配置
TB_APP_KEY=your_app_key
TB_APP_SECRET=your_app_secret
TB_ADZONE_ID=your_adzone_id
```

在代码中读取：

```javascript
const TB_APP_KEY = process.env.TB_APP_KEY || '';
```

### 2. 使用 GitHub Secrets

如果部署到 GitHub Actions，使用 Secrets 存储密钥：

```yaml
env:
  TB_APP_KEY: ${{ secrets.TB_APP_KEY }}
```

### 3. 定期轮换密钥

- 每 3-6 个月更换一次 API 密钥
- 如怀疑密钥泄露，立即更换

---

## 📝 更新项目

### 日常更新

```bash
# 修改代码后
git add .
git commit -m "Update: 描述你的更改"
git push
```

### 版本发布

```bash
# 更新版本号（package.json）
npm version patch  # 1.0.0 -> 1.0.1
# 或
npm version minor  # 1.0.0 -> 1.1.0
# 或
npm version major  # 1.0.0 -> 2.0.0

# 推送标签
git push --tags
```

### 发布 Release

1. 访问 https://github.com/YOUR_USERNAME/ecommerce-rag-skill/releases
2. 点击 "Draft a new release"
3. 选择标签（如 v1.0.0）
4. 填写发布说明
5. 点击 "Publish release"

---

## 🤝 贡献指南

### 接受贡献

- Bug 修复
- 新功能
- 文档改进
- 性能优化

### 不接受贡献

- 包含敏感信息的代码
- 未经验证的外部 API
- 违反许可证的代码

### 提交流程

1. Fork 项目
2. 创建分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📊 项目统计

上传后可以查看：
- ⭐ Stars（收藏数）
- 🍴 Forks（派生数）
- 👀 Watchers（关注数）
- 📈 Traffic（访问量）

---

## 🎯 推广建议

### 1. 完善 README

- ✅ 项目说明清晰
- ✅ 安装步骤详细
- ✅ 使用示例丰富
- ✅ 截图/GIF 演示

### 2. 添加徽章

```markdown
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14-green.svg)
![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/ecommerce-rag-skill.svg)
```

### 3. 分享到社区

- OpenClaw 社区
- GitHub 趋势榜
- 技术论坛（V2EX、知乎等）
- 社交媒体

---

## ⚠️ 注意事项

1. **敏感信息**: 永远不要提交包含密钥的文件
2. **许可证**: 确保使用他人代码符合许可证
3. **依赖安全**: 定期更新依赖，修复安全漏洞
4. **代码质量**: 保持代码整洁，添加注释
5. **文档维护**: 及时更新文档，保持与代码一致

---

## 📞 获取帮助

- GitHub Issues: https://github.com/YOUR_USERNAME/ecommerce-rag-skill/issues
- OpenClaw 文档：https://docs.openclaw.ai
- 社区论坛：https://discord.com/invite/clawd

---

**准备好上传了吗？** 🦞

```bash
# 最后检查
git status
git add .
git commit -m "Ready for GitHub!"
git push
```
