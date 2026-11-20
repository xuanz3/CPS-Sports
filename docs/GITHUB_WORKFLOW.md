# CPS SPORTS — GitHub Workflow

## Branch strategy

- `main`: verified release state.
- `develop`: integration branch.
- `feature/*`: scoped source, asset, interaction and quality changes.

Each feature is committed as genuinely produced. Changes are merged using regular non-fast-forward merge commits to keep an intelligible development trail. No commit timestamps are falsified or backdated.

## Change process

1. Branch from `develop`.
2. Commit a cohesive improvement with a descriptive conventional-commit message.
3. Run `npm run check`, `npm test`, and `npm run build`.
4. Open a pull request in GitHub after pushing the branch.
5. Review and merge it into `develop`, then release to `main` after verifying the integration.

The included local Git history contains authentic branch and merge operations. These local merges are not GitHub pull requests; to create visible remote PRs, push future feature branches and open PRs in the GitHub interface.

The publisher script creates or connects to a private `CPS-SPORTS` repository, then pushes `main` and tags. GitHub authentication may require a one-time browser sign-in.
