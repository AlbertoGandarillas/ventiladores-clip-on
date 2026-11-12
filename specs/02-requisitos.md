# 02 — Requisitos y criterios de aceptación

Formato: `RF-xx` funcional, `RNF-xx` no funcional. Cada uno tiene criterios verificables. Una tarea de `06-tareas.md` se cierra solo cuando sus criterios pasan.

## Requisitos funcionales (secciones, en orden)

### RF-01 Barra superior (sticky)
- Contiene: logo URU horizontal negro (alto 28 px), texto "Importado por URU", indicador "Envíos a todo el Perú" con ícono SVG, botón de WhatsApp (ícono + texto en desktop, solo ícono en móvil ≥ 48×48).
- Sticky con `position: sticky; top: 0`, fondo blanco, sombra sutil al hacer scroll (clase `is-scrolled` vía JS, opcional).
- Sin menú de navegación (una sola página). Si se añade, solo anclas internas.

### RF-02 Hero
- Etiqueta "Ventilador Portátil Clip 360°", H1 único, subtítulo, precio S/ 64.90 (+ "2 por S/ 109.90" pequeño), botón primario "Comprar ahora" (`[ENLACE_PAGO_1]`), botón secundario "Pedir por WhatsApp", 3 insignias, ficha "Producto importado por URU. Marca del fabricante: [NOMBRE_FABRICANTE]".
- Móvil: imagen `ventilador-clip-hero.webp` (cuadrada, `fetchpriority="high"`, sin lazy). Desktop ≥ 1024: `<video>` con `poster`, `preload="none"`, `muted playsinline loop`, se reproduce al entrar en viewport.
- Criterio: en un iPhone SE (375×667) el botón "Comprar ahora" es visible sin scroll.

### RF-03 Problema y solución
- Titular, párrafo, 3 situaciones con ícono SVG, imagen `ventilador-clip-uso-real.webp` lazy. Layout alternado (imagen derecha en desktop).

### RF-04 Beneficios
- 6 tarjetas: ícono SVG inline (24 px), título, texto corto. Grid 2 col móvil / 3 col desktop. Línea de cierre bajo la grid.

### RF-05 Cómo usarlo
- 3 pasos numerados con ícono. Video `ventilador-clip-como-usar.mp4` con poster, lazy (solo se inserta el `<source>` al entrar en viewport, o `preload="none"`).

### RF-06 Usos recomendados
- 8 tarjetas con foto + título. Móvil: carrusel horizontal con `scroll-snap-type: x mandatory`, sin JS. Desktop: grid de 4. CTA único "Quiero el mío" (WhatsApp).

### RF-07 Comparativa
- Tabla accesible (`<table>` con `<th scope>`), 6 filas, columnas "Ventilador clip" / "Ventilador tradicional", ✓/✗ como SVG con `aria-label`. Nota al pie. Sin marcas de terceros.

### RF-08 Oferta y precios
- 3 tarjetas: 1 ud S/ 64.90 · 2 ud S/ 109.90 (etiqueta "Más elegida", destacada) · 3 ud S/ 149.90. Cada una con precio por unidad, línea de envío y botón "Elegir mi combo" → `[ENLACE_PAGO_n]`; si el enlace de pago está vacío, el botón abre WhatsApp con el mensaje del combo.
- Texto de envío y "Quedan pocas unidades de este lote" (se oculta con una clase cuando `STOCK_LIMITADO = false` en `script.js`).

### RF-09 Garantías URU
- Isotipo URU, titular, intro, 4 garantías con ícono. Bloque de reseñas con `hidden` por defecto; se muestra si `RESEÑAS.length > 0` en `script.js`.
- Ficha del fabricante repetida aquí.

### RF-10 Preguntas frecuentes
- 10 preguntas en `<details><summary>`. Sin JS. La primera abierta por defecto (`open`).

### RF-11 Contacto y redes
- Datos de contacto con placeholders. 6 botones de redes (Instagram, TikTok, Facebook, YouTube, WhatsApp Business, Mercado Libre) con SVG inline, `aria-label`, `rel="noopener"`, `target="_blank"`. Texto "Síguenos en nuestras redes…". CTA "Pedir por WhatsApp".

### RF-12 Llamado final
- Titular, imagen `ventilador-clip-producto-blanco.webp`, precio, botones "Comprar ahora" + "Pedir por WhatsApp".

### RF-13 Footer
- Logo blanco, "Importado por URU", enlaces (WhatsApp, correo, redes), políticas (4), RUC, Libro de reclamaciones, © 2026 URU, "Marca del fabricante: [NOMBRE_FABRICANTE]".

### RF-14 Barra sticky inferior (solo móvil < 1024)
- Aparece cuando el hero sale del viewport (IntersectionObserver). Muestra precio y botón "Pedir por WhatsApp" (alto 56 px). Se oculta sobre el footer. `padding-bottom` en `body` para no tapar contenido.

### RF-15 WhatsApp
- Todos los botones de WhatsApp usan `https://wa.me/[NÚMERO]?text=<mensaje codificado>`. El mensaje base y los de combo están en `04-contenido.md`. Un único punto de configuración en `script.js` (`CONFIG`), que rellena `href` al cargar; el HTML trae un `href` de respaldo.

### RF-16 Pago
- Botones "Comprar ahora"/"Elegir mi combo" apuntan a `[ENLACE_PAGO_1..3]`. Si vacío → fallback a WhatsApp. Documentar en README cómo obtener links de Mercado Pago / Culqi / Izipay.

### RF-17 Páginas de políticas
- 4 páginas HTML simples en `politicas/` con el mismo header/footer: `privacidad.html`, `terminos.html`, `devoluciones.html`, `libro-de-reclamaciones.html` (esta última con formulario estático o enlace al formato oficial; marcar `[CONFIRMAR]`).

## Requisitos no funcionales

### RNF-01 Rendimiento
- Carga inicial móvil < 400 KB sin video. Lighthouse móvil ≥ 90. Imágenes WebP con `width`/`height`; `loading="lazy"` bajo el hero; `decoding="async"`.
- Fuentes: un `<link>` a Google Fonts con `display=swap`, solo Manrope 800 e Inter 400/600; `<link rel="preconnect">`.
- Video hero ≤ 1.5 MB, 720p, `preload="none"`.

### RNF-02 Accesibilidad (WCAG 2.1 AA)
- Contraste ≥ 4.5:1 (texto secundario `#5B6470` sobre blanco cumple). Foco visible (`:focus-visible`). Áreas táctiles ≥ 48×48. `alt` descriptivo en español en todas las imágenes; decorativas con `alt=""`. SVG decorativos `aria-hidden="true"`. Orden de encabezados H1 → H2 → H3 sin saltos. `prefers-reduced-motion` desactiva animaciones.

### RNF-03 SEO
- `<html lang="es-PE">`. `<title>`: "Ventilador Portátil Clip 360° recargable | Importado por URU". Meta description ≤ 155 caracteres. Open Graph + Twitter Card con `ventilador-clip-og.webp` (1200×630). Canonical `https://uru.pe/ventilador-clip`. JSON-LD `Product` con `offers` (3 precios), `brand` = fabricante, `seller` = URU. `robots.txt` y `sitemap.xml`.

### RNF-04 Código
- HTML5 semántico (`header`, `main`, `section` con `aria-labelledby`, `footer`). CSS con variables en `:root`, mobile-first, breakpoints 768 y 1024. JS < 6 KB, sin dependencias, en un IIFE o módulo, con comentarios en español. Sin `innerHTML` con datos externos.

### RNF-05 Idioma
- Todo en español (contenido, `alt`, `aria-label`, meta, comentarios, README). Precios con formato `S/ 64.90`.

### RNF-06 Hosting
- Estático. Debe funcionar subiendo la carpeta tal cual a Vercel, Netlify, GitHub Pages o hosting compartido. Ruta `/ventilador-clip/` → incluir `vercel.json` con `cleanUrls` y rewrite opcional (documentado en README).
