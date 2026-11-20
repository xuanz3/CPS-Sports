# GitHub Workflows

## 分支与审核

- `main`：经过测试的发布分支。
- `develop`：功能集成分支。
- `feature/*`：独立功能分支，提交小且可读。
- 功能分支 → PR 至 `develop` → CI 通过 → Review → Merge（保留提交）→ 版本发布时从 `develop` PR 至 `main`。

项目附带了本地真实开发提交与合并记录；首次发布到远程不等于历史上的提交在 GitHub 不同日期发生。所有记录采用真实时间，不伪造时间戳、不伪装他人审核，也不捏造周数。

## 建立远程仓库

最省操作的方法：本机安装并授权 GitHub CLI `gh`，双击 `PUBLISH_TO_GITHUB.command`。脚本会检查并创建 **private** 仓库 `CPS-SPORTS`，然后推送 `main` 与标记。若没有 `gh`，脚本会打开 GitHub 新建仓库页面，请创建**空仓库**（不勾选 README / gitignore），再填入仓库 URL。

第一次创建完成之后，后续功能只需标准操作：

```bash
git switch develop
git switch -c feature/your-change
# 编写并自测
npm run check && npm test && npm run build
git add .
git commit -m "feat: your clear change"
git push -u origin feature/your-change
# 在 GitHub 创建 Pull Request → develop
```

`main` 启用分支保护：必须 CI 通过；要求 PR 合并；不允许强制推送。没有足够的审核人员时可先启用 CI + PR，按需要逐步增加审核规则。
