// Convierte y renombra los archivos descargados del Drive según scripts/mapa-assets.json.
// Uso: npm run assets   (requiere Node 18+, `sharp` instalado por npm y `ffmpeg` en el PATH para videos)
// Origen: assets/_origen/   →   Destino: assets/img, assets/video, assets/logo

import { readFile, readdir, mkdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const run = promisify(execFile);
// fileURLToPath evita rutas tipo "/C:/..." en Windows
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGEN = path.join(RAIZ, "assets", "_origen");
const DESTINO = path.join(RAIZ, "assets");
const mapa = JSON.parse(await readFile(path.join(RAIZ, "scripts", "mapa-assets.json"), "utf8"));

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function buscar(nombre) {
  // Busca el archivo en cualquier subcarpeta de _origen (el Drive puede bajar con carpetas).
  // Se normalizan separadores para que las rutas con "/" del mapa coincidan también en Windows.
  const buscado = nombre.replace(/\\/g, "/");
  const tieneCarpeta = buscado.includes("/");
  async function walk(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { const r = await walk(p); if (r) return r; }
      else if (tieneCarpeta ? p.replace(/\\/g, "/").endsWith("/" + buscado) : e.name === buscado) return p;
    }
    return null;
  }
  return walk(ORIGEN);
}

// Procesa una imagen: recorte opcional (px del original), quitar bordes transparentes, redimensionado y salida WebP/PNG
async function procesar(src, { destino, ancho, alto, recorte, quitarBordes, calidad = 82 }) {
  const out = path.join(DESTINO, destino);
  await mkdir(path.dirname(out), { recursive: true });
  let img = sharp(src);
  if (recorte) img = img.extract(recorte);
  if (quitarBordes) img = sharp(await img.trim().toBuffer());
  img = img.resize({ width: ancho, height: alto, fit: alto ? "cover" : "inside", withoutEnlargement: !alto });
  img = out.endsWith(".webp") ? img.webp({ quality: calidad, effort: 6 }) : img.png({ compressionLevel: 9, palette: true });
  await img.toFile(out);
  const { size } = await stat(out);
  console.log(`✓ ${destino}  ${kb(size)}`);
}

async function imagen(item) {
  const src = await buscar(item.origen);
  if (!src) { console.warn(`⚠ No encontrado: ${item.origen}`); return; }
  await procesar(src, item);
}

// Extrae un fotograma de un video en el segundo indicado y lo procesa como imagen
async function fotograma(item) {
  const src = await buscar(item.origen);
  if (!src) { console.warn(`⚠ No encontrado: ${item.origen}`); return; }
  const tmp = path.join(tmpdir(), `fotograma-${Date.now()}.png`);
  await run("ffmpeg", ["-y", "-v", "error", "-ss", String(item.segundo), "-i", src, "-frames:v", "1", tmp]);
  await procesar(tmp, item);
  await unlink(tmp);
}

async function video({ origen, destino, poster, alto, crf }) {
  const src = await buscar(origen);
  if (!src) { console.warn(`⚠ No encontrado: ${origen}`); return; }
  const out = path.join(DESTINO, destino);
  await mkdir(path.dirname(out), { recursive: true });
  // Comprime a H.264, sin audio, altura máxima `alto`, listo para web (faststart)
  await run("ffmpeg", ["-y", "-v", "error", "-i", src, "-an", "-vf", `scale=-2:${alto}`, "-c:v", "libx264", "-crf", String(crf), "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out]);
  const posterPng = path.join(tmpdir(), `poster-${Date.now()}.png`);
  await run("ffmpeg", ["-y", "-v", "error", "-ss", "00:00:01", "-i", out, "-frames:v", "1", posterPng]);
  await sharp(posterPng).webp({ quality: 75 }).toFile(path.join(DESTINO, poster));
  await unlink(posterPng);
  const { size } = await stat(out);
  console.log(`✓ ${destino}  ${kb(size)}  + poster`);
}

if (!existsSync(ORIGEN)) {
  console.error("Falta assets/_origen/. Descarga la carpeta del Drive y descomprímela ahí.");
  process.exit(1);
}

console.log("Imágenes:");
for (const i of mapa.imagenes) await imagen(i);
console.log("Logos:");
for (const l of mapa.logos) await imagen(l);
console.log("Open Graph:");
// La OG se recorta desde el hero ya generado en assets/img
await procesar(path.join(DESTINO, mapa.og.origen), mapa.og);
console.log("Fotogramas y videos (requiere ffmpeg):");
for (const f of mapa.fotogramas ?? []) {
  try { await fotograma(f); } catch (e) { console.warn(`⚠ ffmpeg falló para ${f.destino}: ${e.message}`); }
}
for (const v of mapa.videos) {
  try { await video(v); } catch (e) { console.warn(`⚠ ffmpeg falló para ${v.origen}: ${e.message}`); }
}
console.log("\nListo. Revisa los pesos contra specs/05-assets.md.");
