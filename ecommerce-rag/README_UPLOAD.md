# 📤 GitHub 上传说明

## ⚠️ Token 权限问题

你提供的 Token 只有**读取权限**，没有**写入权限**。

### 解决方案

#### 方案 1: 使用 GitHub 网页上传（推荐，最简单）

1. **访问仓库**
   https://github.com/2376708518/Phone_Guider

2. **上传文件**
   - 点击 "uploading an existing file"
   - 从文件管理器拖拽文件

3. **文件位置**
   ```
   /home/admin/.openclaw/workspace/skills/ecommerce-rag/
   ```

4. **上传这些文件**:
   ```
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
   📄 FINAL_UPLOAD.md
   📄 LICENSE
   📄 .gitignore
   📄 package.json
   📄 push.sh
   ```

5. **提交信息**: `Initial commit: Phone Guider v1.0`

6. **点击 "Commit changes"**

---

#### 方案 2: 创建新的 Token（有写入权限）

1. **访问**: https://github.com/settings/tokens

2. **点击**: "Generate new token (classic)"

3. **填写**:
   - Note: `Phone_Guider Push`
   - Expiration: `No expiration`

4. **选择权限**（重要！）:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)

5. **点击**: "Generate token"

6. **复制新 Token**（格式：`ghp_xxxxxxxxxxxx`）

7. **使用新 Token 推送**:
   ```bash
   cd /home/admin/.openclaw/workspace/skills/ecommerce-rag
   git push https://2376708518:NEW_TOKEN@github.com/2376708518/Phone_Guider.git main
   ```

---

#### 方案 3: 使用 Git 命令行（需要新 Token）

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 1. 配置 Git
git config user.email "2376708518@qq.com"
git config user.name "白云"

# 2. 添加文件
git add .

# 3. 提交
git commit -m "Initial commit: Phone Guider v1.0"

# 4. 推送（使用有写入权限的 Token）
git push https://2376708518:ghp_xxxxxxxxxxxx@github.com/2376708518/Phone_Guider.git main
```

---

## 🎯 推荐：网页上传步骤

### 第 1 步：打开上传页面

https://github.com/2376708518/Phone_Guider/upload/main

### 第 2 步：选择文件

打开文件管理器，进入：
```
/home/admin/.openclaw/workspace/skills/ecommerce-rag/
```

### 第 3 步：拖拽文件

选择以下文件/文件夹拖拽到上传区域：

**文件夹**:
- `scripts/` (整个文件夹)
- `references/` (整个文件夹)

**文件**:
- `README.md`
- `SKILL.md`
- `SKILL_SUMMARY.md`
- `QUICKSTART.md`
- `PARAM_EXPLAINER_GUIDE.md`
- `PHONE_DATABASE.md`
- `WEEKLY_UPDATE_GUIDE.md`
- `TAOBAO_API_GUIDE.md`
- `DEPLOYMENT.md`
- `UPLOAD_CHECKLIST.md`
- `PUSH_TO_GITHUB.md`
- `FINAL_UPLOAD.md`
- `LICENSE`
- `.gitignore`
- `package.json`
- `push.sh`

### 第 4 步：填写提交信息

```
Initial commit: Phone Guider - 智能电商导购助手 v1.0

Features:
- 68+ 款手机数据
- 智能搜索和参数解释
- 真实导购风格
- 淘宝 API 支持
- 每周自动更新
```

### 第 5 步：点击提交

点击绿色按钮 "Commit changes"

---

## ✅ 上传后检查

访问：https://github.com/2376708518/Phone_Guider

检查项目：
- [ ] README.md 存在
- [ ] SKILL.md 存在
- [ ] scripts/ 目录（8 个文件）
- [ ] references/ 目录
- [ ] LICENSE 存在
- [ ] 文件总数约 22 个

---

## 📊 文件统计

- **总文件数**: 22 个
- **总大小**: ~100KB
- **代码文件**: 8 个 (scripts/)
- **文档文件**: 10 个 (*.md)
- **配置文件**: 4 个

---

## ⚠️ 注意事项

1. **不要上传** `references/tb_config.json`（如果存在）
   - 包含 API 密钥，已添加到 .gitignore

2. **确保上传** `.gitignore`
   - 防止敏感文件被上传

3. **检查文件**
   - 上传后检查所有文件是否存在

---

## 🎉 完成！

上传成功后：

1. 访问项目：https://github.com/2376708518/Phone_Guider
2. 完善项目描述
3. 添加主题标签：`ecommerce`, `shopping`, `ai`, `openclaw`
4. 分享给朋友

---

**立即上传吧！** 🦞

文件位置：`/home/admin/.openclaw/workspace/skills/ecommerce-rag/`

上传页面：https://github.com/2376708518/Phone_Guider/upload/main
