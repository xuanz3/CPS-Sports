#!/bin/bash
set -e
cd "$(dirname "$0")"
echo 'CPS SPORTS — GitHub Publisher'
echo '使用真实 Git 提交记录；不会修改或伪造提交日期。'
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo '项目内缺少 .git 目录，请使用包含版本历史的完整 ZIP。'
  read -r -p '按 Enter 退出...'; exit 1
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  if command -v gh >/dev/null 2>&1; then
    gh auth status >/dev/null 2>&1 || gh auth login
    OWNER=$(gh api user --jq .login)
    if gh repo view "$OWNER/CPS-SPORTS" >/dev/null 2>&1; then
      git remote add origin "https://github.com/$OWNER/CPS-SPORTS.git"
    else
      gh repo create "CPS-SPORTS" --private --source . --remote origin --description 'CPS SPORTS — professional sports equipment storefront'
    fi
  else
    echo '未检测到 GitHub CLI。浏览器将打开创建仓库页面（新建空仓库）。'
    open 'https://github.com/new?name=CPS-SPORTS' 2>/dev/null || true
    read -r -p '创建完空仓库后，粘贴 GitHub 仓库 URL: ' REMOTE
    if [[ ! "$REMOTE" =~ ^https://github\.com/[^/]+/[^/]+(\.git)?$ ]]; then
      echo '仓库 URL 格式错误。'; exit 1
    fi
    git remote add origin "$REMOTE"
  fi
fi
git switch main
git push --set-upstream origin main --follow-tags
printf '\n发布完成。仓库：%s\n' "$(git remote get-url origin)"
echo '后续功能分支请通过 Pull Request 合并；当前未自动推送全部工作分支。'
read -r -p '按 Enter 关闭窗口...'
