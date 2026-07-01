# Vinsync Homepage Design

## Goal

Create a separate static repository for `vinsync.co.kr`, ready to connect to GitHub and Cloudflare Pages.

The site is a minimal company homepage for Vinsync, the company operating Sommelist.

## Scope

In scope:

- One public page at `/`.
- White background.
- Vinsync logo from the provided business-card AI/PDF file.
- Korean company copy supplied by the user.
- A clear link to `https://sommelist.kr`.
- README and Cloudflare Pages deployment guide.
- Local verification before handoff.

Out of scope:

- Blog, navigation, analytics, forms, CMS, tracking scripts, or multi-page company content.
- GitHub remote creation and Cloudflare project connection.

## Visual Direction

Use the approved centered statement layout.

Keep the page quiet, clean, and restrained.

Use a softer system font stack, relaxed spacing, and low visual ornamentation.

Avoid cards, gradients, decorative backgrounds, and marketing-heavy sections.

Logo quality must be checked from a high-resolution export, not the first low-resolution mockup crop.

## Content Rules

Each Korean sentence should render on its own line on normal desktop widths.

On narrow mobile widths, text may wrap naturally to avoid overflow.

The main headline is:

좋은 와인은 사라지지 않고,
기록되고 이어져야 합니다.

The body copy is the user-provided company description, split into sentence-level lines.

The final call to action links to `https://sommelist.kr`.

## Technical Approach

Use a zero-dependency static site:

- `index.html`
- `assets/styles.css`
- `assets/logo.png`
- `README.md`
- `DEPLOY-CLOUDFLARE-PAGES.md`

Cloudflare Pages settings:

- Framework preset: `None`
- Build command: empty
- Build output directory: `/`

## Verification

Verify locally by opening the static file or serving the directory with a simple local HTTP server.

Check desktop and mobile widths for:

- Logo renders sharply.
- White background and centered layout match the approved direction.
- Each sentence appears as a separate line where space allows.
- `Sommelist` link points to `https://sommelist.kr`.
- No dependency install or build step is required.
