# 📤 最终上传指南

## ⚡ 快速上传（3 步）

### 步骤 1: 访问 GitHub 仓库

打开：https://github.com/2376708518/Phone_Guider

如果仓库不存在，点击 "Create a new repository" 创建。

---

### 步骤 2: 上传文件

#### 方式 A: 网页上传（最简单）

1. 访问 https://github.com/2376708518/Phone_Guider
2. 点击 "uploading an existing file"
3. 拖拽以下文件：

```
从 /home/admin/.openclaw/workspace/skills/ecommerce-rag/ 上传：

📁 scripts/          (整个目录，8 个文件)
📁 references/       (整个目录)
📄 README.md
📄 SKILL.md
📄 SKILL_SUMMARY.md
📄 QUICKSTART.md
📄 PARAM_EXPLAINER_GUIDE.md
📄 PHONE_DATABASE.md
📄 WEEKLY_UPDATE_GUIDE.md
📄 TAOBAO_API_GUIDE.md
📄 DEPLOYMENT.md
📄 UPLOAD_CHECKLIST.md
📄 PUSH_TO_GITHUB.md
📄 LICENSE
📄 .gitignore
📄 package.json
📄 push.sh
```

4. 填写提交信息：`Initial commit: Phone Guider v1.0`
5. 点击 "Commit changes"

#### 方式 B: 使用 Git 命令行

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 1. 配置 Git 用户信息
git config user.email "2376708518@qq.com"
git config user.name "Phone Guider"

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit: Phone Guider v1.0"

# 4. 推送（需要 GitHub Token）
# 访问 https://github.com/settings/tokens 获取 Token
git push https://2376708518:YOUR_TOKEN@github.com/2376708518/Phone_Guider.git main
```

替换 `YOUR_TOKEN` 为你的 GitHub Personal Access Token。

---

### 步骤 3: 验证上传

访问 https://github.com/2376708518/Phone_Guider

检查：
- ✅ README.md 存在
- ✅ scripts/ 目录（8 个文件）
- ✅ references/ 目录
- ✅ 文档完整

---

## 🔑 获取 GitHub Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 填写 Note: `Phone_Guider Upload`
4. 选择权限：✅ `repo` (Full control)
5. 点击 "Generate token"
6. **复制 Token**（只显示一次！）

Token 格式：`ghp_xxxxxxxxxxxxxxxxxxxx`

---

## 📦 上传文件清单

### 必须上传（22 个文件）

```
根目录（16 个）:
├── README.md
├── SKILL.md
├── SKILL_SUMMARY.md
├── QUICKSTART.md
├── PARAM_EXPLAINER_GUIDE.md
├── PHONE_DATABASE.md
├── WEEKLY_UPDATE_GUIDE.md
├── TAOBAO_API_GUIDE.md
├── DEPLOYMENT.md
├── UPLOAD_CHECKLIST.md
├── PUSH_TO_GITHUB.md
├── LICENSE
├── .gitignore
├── package.json
└── push.sh

scripts/ (8 个):
├── rag_manager.js
├── search.js
├── param_explainer.js
├── sales_style.js
├── phone_compare.js
├── weekly_update.js
├── tb_api.js
└── import_phones.js

references/ (1 个):
└── tb_config.json.example
```

### 不要上传

```
❌ references/tb_config.json      # 包含密钥
❌ references/config.json         # 本地配置
❌ references/products.json       # 商品数据（可选）
❌ data/                          # 运行时数据
```

---

## 🎯 推荐：使用 GitHub 网页上传

最简单的方式：

1. 打开 https://github.com/2376708518/Phone_Guider
2. 点击 "uploading an existing file"
3. 从文件管理器拖拽文件
4. 提交

**优点**：
- ✅ 不需要 Git 命令
- ✅ 不需要 Token
- ✅ 可视化操作
- ✅ 可以预览文件

---

## ⚠️ 常见问题

### Q1: 仓库已存在怎么办？

如果仓库已有文件：
1. 删除现有文件
2. 重新上传新项目
3. 或者合并上传

### Q2: 文件大小限制？

GitHub 单个文件限制 100MB
本项目所有文件 < 1MB，完全没问题

### Q3: 上传后如何更新？

```bash
# 修改后
git add .
git commit -m "Update: 描述更改"
git push
```

或者网页上传新文件。

---

## 📊 上传后检查

访问 https://github.com/2376708518/Phone_Guider

### 检查文件

- [ ] README.md 存在
- [ ] SKILL.md 存在
- [ ] scripts/ 目录（8 个文件）
- [ ] references/ 目录
- [ ] LICENSE 存在
- [ ] .gitignore 存在

### 完善信息

- [ ] 添加描述：智能电商导购助手 Skill
- [ ] 添加网站：https://github.com/2376708518/Phone_Guider
- [ ] 添加主题：`ecommerce`, `shopping`, `ai`, `openclaw`

---

## 🎉 完成！

上传成功后：

1. 访问：https://github.com/2376708518/Phone_Guider
2. 分享给朋友
3. 在 OpenClaw 社区宣传

---

**立即上传吧！** 🦞

```bash
# 文件位置
/home/admin/.openclaw/workspace/skills/ecommerce-rag/

# 打开 GitHub
https://github.com/2376708518/Phone_Guider
```
