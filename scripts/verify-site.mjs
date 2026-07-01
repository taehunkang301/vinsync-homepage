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
