# Vinsync Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-dependency static homepage for `vinsync.co.kr` with the approved centered layout, high-quality Vinsync logo, sentence-by-sentence Korean copy, and a Sommelist link.

**Architecture:** The site is plain HTML and CSS served directly by Cloudflare Pages with no build step. A small Node verification script checks the important content and deployment assumptions using only built-in modules.

**Tech Stack:** HTML, CSS, PNG asset, Node.js built-ins for verification, Cloudflare Pages static hosting.

---

## File Structure

- Create: `index.html` as the only public page.
- Create: `assets/styles.css` for all layout, typography, and responsive behavior.
- Create: `assets/logo.png` exported from the provided Vinsync AI/PDF file.
- Create: `scripts/verify-site.mjs` to verify content, link, logo asset, and zero-build setup.
- Create: `README.md` with local usage and project structure.
- Create: `DEPLOY-CLOUDFLARE-PAGES.md` with GitHub and Cloudflare Pages handoff steps.
- Create: `.gitignore` to exclude local/system files and brainstorming artifacts.

### Task 1: Verification Script

**Files:**
- Create: `scripts/verify-site.mjs`

- [ ] **Step 1: Create the verification script before site files exist**

```js
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const checks = [];

function check(name, condition) {
  checks.push({ name, passed: Boolean(condition) });
}

const indexPath = join(root, "index.html");
const stylesPath = join(root, "assets", "styles.css");
const logoPath = join(root, "assets", "logo.png");

check("index.html exists", existsSync(indexPath));
check("assets/styles.css exists", existsSync(stylesPath));
check("assets/logo.png exists", existsSync(logoPath));

const index = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
const styles = existsSync(stylesPath) ? readFileSync(stylesPath, "utf8") : "";

const requiredText = [
  "좋은 와인은 사라지지 않고,",
  "기록되고 이어져야 합니다.",
  "Vinsync는 와인을 다루는 비즈니스가 더 정확하고 간결하게 와인을 기록하고 관리할 수 있도록 돕는 소프트웨어 회사입니다.",
  "우리는 와인 리스트, 메뉴판, 가격, 빈티지, 재고 정보가 흩어져 관리되는 문제에 주목합니다.",
  "와인 한 병의 정보가 매장 운영, 고객 경험, 재고 관리까지 자연스럽게 이어지는 구조를 만들고자 합니다.",
  "Sommelist는 Vinsync의 첫 번째 제품입니다.",
  "와인 정보를 한 번 등록하면 웹 메뉴판과 재고 관리에 함께 반영되어, 매장은 더 적은 반복 업무로 더 정확한 와인 리스트를 운영할 수 있습니다.",
  "와인바, 레스토랑, 호텔, 와인샵을 위한 더 간결한 와인 운영 시스템을 만들고 있습니다.",
  "Sommelist에서 더 자세히 알아보세요.",
];

for (const text of requiredText) {
  check(`contains text: ${text}`, index.includes(text));
}

check("Sommelist link points to production domain", index.includes('href="https://sommelist.kr"'));
check("logo has meaningful alt text", index.includes('alt="Vinsync"'));
check("stylesheet linked", index.includes('href="assets/styles.css"'));
check("sentence line class present", index.includes('class="line"'));
check("mobile wrapping rule present", styles.includes("@media") && styles.includes(".line"));
check("no package.json build setup", !existsSync(join(root, "package.json")));
check("logo asset is not tiny", existsSync(logoPath) && statSync(logoPath).size > 20000);

const failed = checks.filter((item) => !item.passed);

for (const item of checks) {
  console.log(`${item.passed ? "PASS" : "FAIL"} ${item.name}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}
```

- [ ] **Step 2: Run the verification script and confirm it fails**

Run: `node scripts/verify-site.mjs`

Expected: FAIL entries for missing `index.html`, `assets/styles.css`, and `assets/logo.png`.

### Task 2: Static Site Files

**Files:**
- Create: `index.html`
- Create: `assets/styles.css`
- Create: `assets/logo.png`

- [ ] **Step 1: Export high-resolution logo**

Run Quick Look at 4096px, crop the visible wordmark/logo, and save it as `assets/logo.png`.

Expected: `assets/logo.png` exists and is larger than 20 KB.

- [ ] **Step 2: Create `index.html`**

Use semantic HTML with one centered `main`, sentence-level `.line` elements, and a production Sommelist link.

- [ ] **Step 3: Create `assets/styles.css`**

Use a white background, soft black text, centered layout, relaxed spacing, system Korean fonts, desktop line preservation, and mobile wrapping.

- [ ] **Step 4: Run verification script**

Run: `node scripts/verify-site.mjs`

Expected: all checks PASS.

### Task 3: Handoff Documentation

**Files:**
- Create: `README.md`
- Create: `DEPLOY-CLOUDFLARE-PAGES.md`
- Create: `.gitignore`

- [ ] **Step 1: Create README**

Include the purpose, structure, local preview command, and note that there is no build step.

- [ ] **Step 2: Create Cloudflare Pages guide**

Include GitHub push steps, Pages settings, custom domain setup for `vinsync.co.kr`, and operating notes.

- [ ] **Step 3: Create `.gitignore`**

Ignore `.DS_Store`, `.superpowers/`, and local server artifacts.

### Task 4: Final Verification And Commit

**Files:**
- Modify: all created project files

- [ ] **Step 1: Run static verification**

Run: `node scripts/verify-site.mjs`

Expected: all checks PASS.

- [ ] **Step 2: Serve locally**

Run: `python3 -m http.server 4173`

Expected: site is available at `http://127.0.0.1:4173`.

- [ ] **Step 3: Inspect git status**

Run: `git status --short`

Expected: only intended project files are changed.

- [ ] **Step 4: Commit implementation**

Run:

```bash
git add .gitignore DEPLOY-CLOUDFLARE-PAGES.md README.md index.html assets/logo.png assets/styles.css scripts/verify-site.mjs docs/superpowers/plans/2026-07-01-vinsync-homepage-implementation.md
git commit -m "Build Vinsync static homepage"
```

Expected: implementation commit succeeds.
