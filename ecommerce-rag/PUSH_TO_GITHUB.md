# 📤 推送到 GitHub 指南

## ✅ 本地 Git 已初始化

Git 仓库已经初始化完成，代码已提交到本地。

**提交信息**:
- Commit ID: `ba30386`
- 提交内容：Phone Guider - 智能电商导购助手 v1.0
- 文件数：22 个文件

---

## 🚀 推送到 GitHub

### 方式 1: 使用 HTTPS（推荐）

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 添加远程仓库（已添加）
git remote add origin https://github.com/2376708518/Phone_Guider.git

# 如果已存在，先删除再添加
git remote remove origin
git remote add origin https://github.com/2376708518/Phone_Guider.git

# 重命名分支为 main
git branch -M main

# 推送（需要输入 GitHub 用户名和密码）
git push -u origin main
```

**输入凭证**:
- Username: `2376708518`
- Password: 你的 GitHub Personal Access Token

---

### 方式 2: 使用 SSH（推荐）

如果你配置了 SSH 密钥：

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 删除 HTTPS 远程仓库
git remote remove origin

# 添加 SSH 远程仓库
git remote add origin git@github.com:2376708518/Phone_Guider.git

# 推送
git push -u origin main
```

---

### 方式 3: 使用 GitHub CLI（最简单）

如果安装了 `gh` 工具：

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag

# 授权 GitHub
gh auth login

# 推送
git push -u origin main
```

---

## 🔑 获取 Personal Access Token

如果使用 HTTPS 方式，需要 Personal Access Token：

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 填写说明（如：Phone_Guider Push）
4. 选择权限：
   - ✅ `repo` (Full control of private repositories)
5. 点击 "Generate token"
6. **复制 Token**（只显示一次，妥善保存）

使用 Token 作为密码：
```bash
Username: 2376708518
Password: ghp_xxxxxxxxxxxxxxxxxxxx  # 你的 Token
```

---

## 📋 推送后验证

### 1. 访问仓库

打开 https://github.com/2376708518/Phone_Guider

### 2. 检查文件

确认以下文件已上传：
- ✅ `README.md`
- ✅ `SKILL.md`
- ✅ `LICENSE`
- ✅ `package.json`
- ✅ `.gitignore`
- ✅ `scripts/` 目录（8 个文件）
- ✅ `references/` 目录（配置和模板）
- ✅ `docs/` 目录（文档）

### 3. 检查没有的文件

确认以下文件**没有**上传：
- ❌ `references/tb_config.json`
- ❌ `data/` 目录内容

---

## ⚠️ 常见问题

### 问题 1: 认证失败

**错误**: `fatal: could not read Username`

**解决**:
```bash
# 清除缓存的凭证
git config --global --unset credential.helper

# 重新推送
git push -u origin main
```

### 问题 2: Permission denied

**错误**: `fatal: Could not read from remote repository`

**解决**:
```bash
# 检查远程仓库 URL
git remote -v

# 如果不正确，删除并重新添加
git remote remove origin
git remote add origin https://github.com/2376708518/Phone_Guider.git

# 重新推送
git push -u origin main
```

### 问题 3: 仓库已存在内容

如果仓库已有 README 或其他文件：

```bash
# 强制推送（谨慎使用，会覆盖远程仓库）
git push -f -u origin main

# 或者先拉取再合并
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 🎯 快速推送脚本

创建推送脚本 `push.sh`:

```bash
#!/bin/bash

echo "📤 推送到 GitHub..."

# 检查远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 远程仓库未配置"
    echo "运行：git remote add origin https://github.com/2376708518/Phone_Guider.git"
    exit 1
fi

# 重命名分支
git branch -M main

# 推送
echo "🚀 推送到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 推送成功！"
    echo "📱 访问：https://github.com/2376708518/Phone_Guider"
else
    echo "❌ 推送失败，请检查网络和凭证"
fi
```

使用：
```bash
chmod +x push.sh
./push.sh
```

---

## 📊 推送后操作

### 1. 完善仓库信息

访问 https://github.com/2376708518/Phone_Guider/settings

- 添加描述：智能电商导购助手 Skill
- 添加网站：https://github.com/2376708518/Phone_Guider
- 添加主题标签：`ecommerce`, `shopping`, `ai`, `openclaw`, `skill`

### 2. 启用 GitHub Pages（可选）

```
Settings → Pages → Source: main branch → Save
```

访问：https://2376708518.github.io/Phone_Guider/

### 3. 添加徽章

编辑 `README.md`，添加：

```markdown
![GitHub stars](https://img.shields.io/github/stars/2376708518/Phone_Guider.svg?style=social)
![GitHub forks](https://img.shields.io/github/forks/2376708518/Phone_Guider.svg?style=social)
![GitHub issues](https://img.shields.io/github/issues/2376708518/Phone_Guider)
```

---

## 🎉 完成！

推送成功后：

1. ✅ 访问 https://github.com/2376708518/Phone_Guider
2. ✅ 检查所有文件已上传
3. ✅ 分享项目给朋友
4. ✅ 在 OpenClaw 社区宣传

---

**准备好了吗？开始推送吧！** 🦞

```bash
cd /home/admin/.openclaw/workspace/skills/ecommerce-rag
git push -u origin main
```
