# Vinsync Homepage

`vinsync.co.kr`에 배포할 Vinsync 회사 홈페이지입니다.

Sommelist를 운영하는 회사 소개와 `https://sommelist.kr` 링크만 담은 정적 사이트입니다.

## Structure

- `index.html`: public homepage
- `assets/logo.png`: Vinsync logo exported from the provided business-card AI/PDF file
- `assets/styles.css`: page styling
- `scripts/verify-site.mjs`: static verification script
- `DEPLOY-CLOUDFLARE-PAGES.md`: GitHub and Cloudflare Pages handoff guide

## Local Preview

Open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Verification

```bash
node scripts/verify-site.mjs
```

No package install or build step is required.

## Cloudflare Pages

Use these settings:

- Framework preset: `None`
- Build command: empty
- Build output directory: `/`
