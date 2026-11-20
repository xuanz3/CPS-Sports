#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"

REPOSITORY='https://github.com/xuanz3/CPS-Sports.git'
DISPLAY='https://github.com/xuanz3/CPS-Sports'

echo 'CPS SPORTS — GitHub Publisher'
echo "Target: $DISPLAY"
echo 'Publishing genuine Git commits. No timestamps are changed.'
echo

stop() {
  echo
  echo "ERROR: $*"
  echo 'No existing GitHub history was overwritten.'
  read -r -p 'Press Enter to close...' || true
  exit 1
}

command -v git >/dev/null 2>&1 || stop 'Git is not installed. Install Xcode Command Line Tools: xcode-select --install'
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || stop 'Git history missing. Unzip the FULL source archive, not the deploy ZIP.'

if git remote get-url origin >/dev/null 2>&1; then
  EXISTING="$(git remote get-url origin)"
  NORMALIZED="$(printf '%s' "$EXISTING" | tr '[:upper:]' '[:lower:]')"
  case "$NORMALIZED" in
    'https://github.com/xuanz3/cps-sports'|'https://github.com/xuanz3/cps-sports.git'|'git@github.com:xuanz3/cps-sports.git')
      git remote set-url origin "$REPOSITORY" ;;
    *) stop "Existing origin points elsewhere: $EXISTING" ;;
  esac
else
  git remote add origin "$REPOSITORY"
fi

if command -v gh >/dev/null 2>&1; then
  if ! gh auth status >/dev/null 2>&1; then
    echo 'GitHub authentication is required once. Complete the browser sign-in.'
    gh auth login --hostname github.com --git-protocol https --web || stop 'GitHub sign-in failed.'
  fi
  gh auth setup-git || stop 'Could not configure GitHub credentials.'
fi

git switch main || stop 'Cannot switch to main branch.'
[ -z "$(git status --porcelain)" ] || stop 'You have uncommitted changes. Save them before publishing.'

REMOTE_HEADS="$(git ls-remote --heads origin main 2>&1)" || stop "Cannot access GitHub repository. $REMOTE_HEADS"
if [ -n "$REMOTE_HEADS" ]; then
  git fetch origin main || stop 'Could not fetch the existing GitHub main branch.'
  git merge-base --is-ancestor origin/main main || stop 'GitHub main has separate commits. Refusing to overwrite or force-push.'
fi

echo
echo 'Uploading main (with its full merge/commit history)...'
git push --set-upstream origin main || stop 'Main push failed. Check your GitHub login/permissions.'

echo 'Uploading develop branch and release tags...'
git push --set-upstream origin develop || stop 'Develop branch push failed.'
git push origin --tags || stop 'Tags push failed.'

echo
echo 'SUCCESS — CPS SPORTS is now on GitHub:'
echo "$DISPLAY"
echo 'Future updates: commit changes on a feature branch, open a Pull Request, then merge into main.'
if command -v open >/dev/null 2>&1; then
  open "$DISPLAY" || true
fi
read -r -p 'Press Enter to close...' || true
