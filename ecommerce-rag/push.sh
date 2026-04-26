#!/bin/bash

# Phone Guider - GitHub 推送脚本

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         Phone Guider - GitHub 推送工具                    ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# 检查 Git 是否初始化
if [ ! -d ".git" ]; then
    echo "❌ Git 仓库未初始化"
    echo "运行：git init"
    exit 1
fi

# 检查远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null)
if [ -z "$REMOTE_URL" ]; then
    echo "⚠️  远程仓库未配置"
    echo ""
    echo "请选择配置方式："
    echo "1. HTTPS: https://github.com/2376708518/Phone_Guider.git"
    echo "2. SSH: git@github.com:2376708518/Phone_Guider.git"
    echo ""
    read -p "输入选项 (1/2): " choice
    
    if [ "$choice" = "1" ]; then
        git remote add origin https://github.com/2376708518/Phone_Guider.git
        echo "✅ 已配置 HTTPS 远程仓库"
    elif [ "$choice" = "2" ]; then
        git remote add origin git@github.com:2376708518/Phone_Guider.git
        echo "✅ 已配置 SSH 远程仓库"
    else
        echo "❌ 无效选项"
        exit 1
    fi
else
    echo "✅ 远程仓库已配置：$REMOTE_URL"
fi

echo ""

# 检查是否有未提交的更改
CHANGED=$(git status --porcelain)
if [ -n "$CHANGED" ]; then
    echo "⚠️  有未提交的更改："
    git status --short
    echo ""
    read -p "是否提交更改？(y/n): " commit_choice
    
    if [ "$commit_choice" = "y" ]; then
        git add .
        git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "✅ 已提交更改"
    fi
fi

# 重命名分支为 main
git branch -M main 2>/dev/null
echo "✅ 分支已重命名为 main"

# 推送
echo ""
echo "🚀 开始推送到 GitHub..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                    ✅ 推送成功！                          ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "📱 访问仓库：https://github.com/2376708518/Phone_Guider"
    echo ""
    echo "下一步："
    echo "1. 访问仓库页面"
    echo "2. 添加项目描述和主题标签"
    echo "3. 分享给朋友"
    echo ""
else
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                    ❌ 推送失败                            ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "可能的原因："
    echo "1. GitHub 用户名或密码错误"
    echo "2. 网络连接问题"
    echo "3. 仓库不存在或无权限"
    echo ""
    echo "解决方法："
    echo "1. 检查 GitHub 凭证"
    echo "2. 使用 Personal Access Token 代替密码"
    echo "3. 检查网络连接"
    echo ""
    echo "获取 Token: https://github.com/settings/tokens"
    echo ""
fi
