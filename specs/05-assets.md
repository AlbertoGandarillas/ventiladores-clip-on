# 05 — Assets: nombres amigables y mapa de uso

Regla de nombres: español, minúsculas, sin acentos ni espacios, guiones, descriptivo. Patrón: `ventilador-clip-<que-muestra>.<ext>`. Nunca IDs de Amazon ni de Higgsfield en el repo.

## Paso 1 — Descargar el Drive

Descargar la carpeta completa de Drive (`https://drive.google.com/drive/folders/1ZoP9-LtjINtpYQ-QWWv0t4wcTLl0RfN3`) y descomprimirla en `assets/_origen/` (carpeta ignorada por git).

## Paso 2 — Mapa de renombrado y conversión

`npm run assets` ejecuta `scripts/preparar-assets.mjs`, que lee esta tabla desde `scripts/mapa-assets.json`, convierte a WebP (calidad 82, ancho máximo indicado) y genera posters de video.

> **Revisión T00 (12-nov-2026):** al abrir los originales se comprobó que varias fotos de Amazon son infografías con texto en inglés y datos técnicos sin verificar (900 mAh, 2–5 h, 25 dB, 5100 RPM, "OURS/OTHERS"). Mostrarlas violaría las reglas de idioma y de datos no verificados, así que se descartan. Los usos se obtienen de fotogramas del video hero (escritorio, coche de bebé, mesa de noche) y de recortes del collage `81xtEYxqV+L` (gimnasio, viajes, exterior, oficina), que no tiene texto.

| Archivo original (Drive) | Nuevo nombre | Tamaño | Uso |
| --- | --- | --- | --- |
| `hf_20261112_030520_….png` | `ventilador-clip-hero.webp` | 1200×1200 (recorte cuadrado) | Hero móvil y OG |
| `hf_20261112_031710_….png` | `ventilador-clip-uso-real.webp` | 900×1200 | Problema y solución |
| `hf_20261112_030742_….mp4` | `ventilador-clip-hero.mp4` + `ventilador-clip-hero-poster.webp` | 720p, ≤ 1.5 MB | Video hero desktop |
| `video-clip-celeste.mp4` | `ventilador-clip-como-usar.mp4` + `ventilador-clip-como-usar-poster.webp` | 720p | Cómo usarlo |
| `61ycXyL8IQL._AC_SL1500_.avif` | `ventilador-clip-producto-blanco.webp` | 1000 | Llamado final, JSON-LD image, usos sin foto (fondo blanco real, sin texto) |
| `hf_20261112_030742_….mp4` (fotograma 5 s) | `ventilador-clip-uso-escritorio.webp` | 800×600 | Uso "Escritorio y home office" |
| `hf_20261112_030742_….mp4` (fotograma 9.5 s) | `ventilador-clip-uso-coche-bebe.webp` | 800×600 | Uso "Coche de bebé" |
| `hf_20261112_030742_….mp4` (fotograma 13 s) | `ventilador-clip-uso-cama.webp` | 800×600 | Uso "Cama o cabecera" |
| `81xtEYxqV+L._AC_SL1500_.avif` (recorte izquierda) | `ventilador-clip-uso-gimnasio.webp` | 800×600 | Uso "Gimnasio" |
| `81xtEYxqV+L._AC_SL1500_.avif` (recorte arriba derecha) | `ventilador-clip-uso-viajes.webp` | 800×600 | Uso "Viajes" |
| `81xtEYxqV+L._AC_SL1500_.avif` (recorte centro derecha) | `ventilador-clip-uso-exterior.webp` | 800×600 | Uso "Exterior y paseos" |
| `81xtEYxqV+L._AC_SL1500_.avif` (recorte abajo derecha) | `ventilador-clip-uso-oficina.webp` | 800×600 | Uso "Oficina" |
| `verde.avif` | `ventilador-clip-color-verde.webp` | 600 | Selector de colores (si hay stock) |
| `blanco-naranja.avif` | `ventilador-clip-color-blanco-naranja.webp` | 600 | Selector de colores |
| `81BiojpqZFL`, `81QOrkqXYyL`, `71aJRsN4p1L`, `71l2q3W8ZkL`, `71ZSXbpc8RL`, `verde2`, `verde-3`, `verde-4`, `blanco-naranja-2` | (descartar: infografías en inglés con datos sin verificar) | — | — |
| `81BiojpqZFL._AC_SX679_.avif` | (descartar: duplicado de menor tamaño) | — | — |
| `URU-logo-kit/01-logo-horizontal/uru-logo-horizontal-negro-sobre-transparente.png` | `logo/uru-logo-horizontal-negro.png` | 600 | Header |
| `URU-logo-kit/01-logo-horizontal/uru-logo-horizontal-blanco-sobre-transparente.png` | `logo/uru-logo-horizontal-blanco.png` | 600 | Footer |
| `URU-logo-kit/04-isotipo/negro-sobre-transparente/uru-isotipo-256.png` | `logo/uru-isotipo.png` | 256 | Sello garantías, sticky |
| `URU-logo-kit/06-favicon-app/uru-favicon-32.png` | `logo/favicon-32.png` | 32 | Favicon |
| `URU-logo-kit/06-favicon-app/uru-favicon-180.png` | `logo/favicon-180.png` | 180 | apple-touch-icon |
| `URU-logo-kit/06-favicon-app/uru-favicon-512.png` | `logo/favicon-512.png` | 512 | PWA / OG fallback |

Usos sin foto propia todavía (Cocina): usar `ventilador-clip-producto-blanco.webp` con el título de la tarjeta, y marcar en README como "pendiente foto real".

## Imagen Open Graph

Generar `ventilador-clip-og.webp` (1200×630) desde `ventilador-clip-hero.webp` recortada al centro, con el script.

## Atributos obligatorios en cada `<img>`

`src`, `width`, `height` (reales), `alt` en español (ver `04-contenido.md`), `loading="lazy"` y `decoding="async"` excepto el hero (`fetchpriority="high"`).

## Peso objetivo

| Tipo | Máximo |
| --- | --- |
| Hero WebP | 120 KB |
| Imagen de sección | 80 KB |
| Tarjeta de uso | 45 KB |
| Logo header | 12 KB |
| Video hero | 1.5 MB (no cuenta en carga inicial) |
