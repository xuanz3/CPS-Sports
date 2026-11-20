#!/bin/bash
set -e
cd "$(dirname "$0")"
echo 'CPS SPORTS — GitHub publisher'
echo 'This script publishes actual Git commits with authentic timestamps.'
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo 'Missing .git history. Extract the complete source ZIP first.'
  read -r -p 'Press Enter to exit...'; exit 1
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  if command -v gh >/dev/null 2>&1; then
    gh auth status >/dev/null 2>&1 || gh auth login
    OWNER=$(gh api user --jq .login)
    if gh repo view "$OWNER/CPS-SPORTS" >/dev/null 2>&1; then
      git remote add origin "https://github.com/$OWNER/CPS-SPORTS.git"
    else
      gh repo create CPS-SPORTS --private --source . --remote origin --description 'CPS SPORTS premium sports equipment storefront'
    fi
  else
    echo 'GitHub CLI was not found. Create an empty GitHub repository in the opened page.'
    open 'https://github.com/new?name=CPS-SPORTS' 2>/dev/null || true
    read -r -p 'Paste the new repository URL: ' REMOTE
    if [[ ! "$REMOTE" =~ ^https://github\.com/[^/]+/[^/]+(\.git)?$ ]]; then
      echo 'Invalid GitHub repository URL'; exit 1
    fi
    git remote add origin "$REMOTE"
  fi
fi
git switch main
git push --set-upstream origin main --follow-tags
printf '\nRepository: %s\n' "$(git remote get-url origin)"
echo 'For future iterations, open pull requests from feature branches.'
read -r -p 'Press Enter to close...'
