// Suma el peso de la carga inicial: index.html + styles.css + script.js + imágenes sin loading="lazy" + logos del header.
// Uso: npm run check
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIMITE_KB = 400;
const html = await readFile(path.join(RAIZ, "index.html"), "utf8");

const archivos = new Set(["index.html", "styles.css", "script.js"]);
// Imágenes que NO son lazy (se cargan al inicio)
for (const m of html.matchAll(/<img\b[^>]*>/g)) {
  const tag = m[0];
  if (/loading=["']lazy["']/.test(tag)) continue;
  const src = tag.match(/src=["']([^"']+)["']/)?.[1];
  if (src && !src.startsWith("http")) archivos.add(src.replace(/^\.?\//, ""));
}
// Posters de video sí se cargan si el video está en el primer viewport; los contamos
for (const m of html.matchAll(/poster=["']([^"']+)["']/g)) archivos.add(m[1].replace(/^\.?\//, ""));

let total = 0;
for (const a of archivos) {
  try { const { size } = await stat(path.join(RAIZ, a)); total += size; console.log(`${(size / 1024).toFixed(1).padStart(7)} KB  ${a}`); }
  catch { console.warn(`   ---      ${a} (no existe)`); }
}
const totalKb = total / 1024;
console.log(`\nCarga inicial: ${totalKb.toFixed(0)} KB (límite ${LIMITE_KB} KB) → ${totalKb <= LIMITE_KB ? "OK" : "EXCEDE"}`);
process.exit(totalKb <= LIMITE_KB ? 0 : 1);
