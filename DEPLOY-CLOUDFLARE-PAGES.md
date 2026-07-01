# Cloudflare Pages Deployment Guide

This project is a zero-build static site for `vinsync.co.kr`.

## 1. Push To GitHub

Create an empty GitHub repository, then connect this local repository:

```bash
cd /Users/taehunkang/work/vinsync-homepage
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin implement-static-homepage
```

If you want `main` to be the deployment branch, merge or rename the branch before connecting Cloudflare Pages.

## 2. Create Cloudflare Pages Project

1. Open Cloudflare Dashboard.
2. Go to Workers & Pages.
3. Select Create application.
4. Select Pages.
5. Select Connect to Git.
6. Choose the GitHub repository.

Use these build settings:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`

Deploy once and confirm the generated `*.pages.dev` URL works.

## 3. Connect `vinsync.co.kr`

1. Add `vinsync.co.kr` to Cloudflare if it is not already managed there.
2. Update the registrar nameservers to Cloudflare nameservers if needed.
3. Open the Pages project.
4. Go to Custom domains.
5. Add `vinsync.co.kr`.
6. Add `www.vinsync.co.kr` only if you want the `www` hostname too.
7. Confirm HTTPS certificate issuance completes.

## 4. Operate

Push changes to the connected branch to trigger redeployment.

For failures, check Pages > Deployments > failed deployment logs.

Before pushing content changes, run:

```bash
node scripts/verify-site.mjs
```
