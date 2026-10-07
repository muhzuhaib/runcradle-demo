import { readdirSync } from "node:fs";

const suite = process.argv[2] ?? "unit";
const folder = new URL(`../test/${suite}/`, import.meta.url);
let failed = 0;

for (const file of readdirSync(folder).filter((name) => name.endsWith(".test.js")).sort()) {
  const cases = (await import(new URL(file, folder))).default;
  const failures = [];
  for (const [name, run] of cases) {
    const [received, expected] = run();
    if (received !== expected) failures.push(`  ${name}: expected ${expected}, received ${received}`);
  }
  const passed = cases.length - failures.length;
  console.log(`${file.padEnd(22)} ${passed} passed${failures.length ? `, ${failures.length} failed` : ""}`);
  failures.forEach((line) => console.log(line));
  failed += failures.length;
}
process.exit(failed ? 1 : 0);
