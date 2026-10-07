import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src", "test", "scripts"];
const files = [];
const walk = (dir) => readdirSync(dir).forEach((name) => {
  const path = join(dir, name);
  statSync(path).isDirectory() ? walk(path) : files.push(path);
});
roots.forEach(walk);

const problems = files.flatMap((file) => {
  const text = readFileSync(file, "utf8");
  const found = [];
  if (text.includes("\t")) found.push(`${file}: tab indentation`);
  if (/[ ]+$/m.test(text)) found.push(`${file}: trailing spaces`);
  if (!text.endsWith("\n")) found.push(`${file}: no final newline`);
  return found;
});
problems.forEach((line) => console.log(line));
console.log(problems.length ? `${problems.length} formatting problems.` : `Checked ${files.length} files. All formatted.`);
process.exit(problems.length ? 1 : 0);
