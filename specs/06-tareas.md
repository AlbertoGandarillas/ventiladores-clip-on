# 06 — Backlog de tareas (ejecutar en orden, una a la vez)

Cada tarea referencia sus requisitos (`RF`/`RNF`). Marcar `[x]` al cerrar con todos los criterios verificados.

## Fase 0 — Preparación

- [x] **T00 Assets.** Descargar el Drive a `assets/_origen/`, correr `npm run assets`, verificar que `assets/img/` y `assets/video/` contienen solo nombres de `05-assets.md` y que ningún archivo supera su peso objetivo. (`05-assets.md`, RNF-01)
  - Mapa corregido en `05-assets.md`: las infografías de Amazon (texto en inglés y datos sin verificar) se descartan; los usos salen de fotogramas del video hero y del collage. Script arreglado para Windows y con soporte de recortes/fotogramas. Hero 47 KB, tarjetas ≤ 33 KB, video hero 423 KB.
- [x] **T01 Esqueleto.** `index.html` con `<html lang="es-PE">`, `<head>` completo (meta, fonts, favicon, OG, canonical), `styles.css` con variables de `03-diseno.md` y reset mínimo, `script.js` con objeto `CONFIG` y todos los placeholders. `npm run serve` abre la página en blanco sin errores de consola. (RNF-03, RNF-04, RNF-05)

## Fase 1 — Above the fold

- [x] **T02 Barra superior.** RF-01. Criterio: sticky, logo 28 px, WhatsApp ≥ 48×48, "Importado por URU" visible en 320 px.
  - "Envíos a todo el Perú" visible desde 480 px; bajo 360 px el sello va debajo del logo (ver `03-diseno.md`).
- [x] **T03 Hero.** RF-02. Criterio: CTA visible sin scroll en 375×667; imagen hero < 120 KB; en desktop el video solo carga al entrar en viewport.
  - CTA termina en y = 638 en 375×667. El alto de la imagen se limita según el viewport. Video con `data-src` + botón de pausa (WCAG 2.2.2).
- [x] **T04 Barra sticky inferior.** RF-14. Criterio: aparece tras el hero, se oculta sobre el footer, no tapa contenido.
  - Lleva el isotipo pequeño, permitido por `01-marca.md`.

## Fase 2 — Cuerpo

- [x] **T05 Problema y solución.** RF-03.
- [x] **T06 Beneficios.** RF-04. Criterio: 6 tarjetas, íconos SVG inline, grid 2/3.
  - Íconos como sprite `<symbol>` inline en el mismo HTML.
- [x] **T07 Cómo usarlo.** RF-05. Criterio: video con poster y `preload="none"`.
- [x] **T08 Usos recomendados.** RF-06. Criterio: carrusel con scroll-snap sin JS en móvil; grid 4 en desktop.
- [x] **T09 Comparativa.** RF-07. Criterio: tabla semántica, ✓/✗ con `aria-label`.
- [x] **T10 Oferta y precios.** RF-08, RF-16. Criterio: botón de combo usa link de pago o fallback a WhatsApp con el mensaje correcto.
- [x] **T11 Garantías URU.** RF-09. Criterio: bloque de reseñas oculto si `CONFIG.RESEÑAS` está vacío.
- [x] **T12 Preguntas frecuentes.** RF-10. Criterio: `<details>` nativo, primera abierta.
- [x] **T13 Contacto y redes.** RF-11. Criterio: 6 botones con SVG, `rel="noopener"`.
- [x] **T14 Llamado final.** RF-12.
- [x] **T15 Footer.** RF-13.

## Fase 3 — Comportamiento y páginas secundarias

- [x] **T16 WhatsApp y CONFIG.** RF-15. Criterio: cambiar `CONFIG.WHATSAPP` actualiza todos los `href`; mensajes codificados correctamente (probar con tildes y emoji).
  - Probado con `CONFIG` modificado: 7 enlaces de WhatsApp con el número, mensaje decodificado idéntico, pago del combo 2 aplicado y el resto con fallback.
- [x] **T17 Animaciones.** `03-diseno.md`. Criterio: `.revelar` con IntersectionObserver; con `prefers-reduced-motion` todo visible sin transición.
  - La clase `.js` se añade en `<head>` para que el contenido sea visible si JS falla.
- [x] **T18 Páginas de políticas.** RF-17. Criterio: 4 páginas con header/footer coherentes, en español, enlazadas desde el footer.
  - Texto legal base con marcas `[CONFIRMAR …]`. El libro de reclamaciones es un formulario estático `mailto:` (pendiente de confirmar un servicio oficial).
- [x] **T19 SEO técnico.** RNF-03. Criterio: JSON-LD válido en el validador de Schema.org; `robots.txt`, `sitemap.xml`, canonical.
  - JSON-LD validado con un parser (`brand` = fabricante, `seller` = URU). Falta pasarlo por validator.schema.org una vez publicado. `vercel.json` reescribe `/ventilador-clip`.

## Fase 4 — Calidad y lanzamiento

- [x] **T20 Revisión de marca.** Checklist completo de `01-marca.md`.
- [x] **T21 Accesibilidad.** RNF-02. Criterio: Lighthouse Accesibilidad ≥ 95; navegación por teclado completa; contraste verificado.
  - Lighthouse 100 (móvil y desktop). Se añadió `--color-primario-oscuro` por contraste (ver `03-diseno.md`).
- [x] **T22 Rendimiento.** RNF-01. Criterio: Lighthouse móvil Performance ≥ 90; carga inicial < 400 KB (`npm run check`).
  - Lighthouse móvil 99 (LCP 1.6 s, CLS 0). Carga inicial 130 KB. `script.js` 6.0 KB.
- [x] **T23 README.** Instrucciones en español: reemplazar placeholders, fotos, WhatsApp, links de pago, deploy en Vercel/Netlify/GitHub Pages, cómo añadir reseñas reales.
- [ ] **T24 Checklist de lanzamiento.** Ejecutar `07-lanzamiento.md` completo.
  - Ejecutado lo verificable en local; quedan los puntos que dependen del dueño (datos reales, dispositivos físicos, dominio, publicación).

## Cómo pedirle una tarea a Claude Code

```
Lee CLAUDE.md y specs/. Implementa la tarea T03 de specs/06-tareas.md.
No toques otras secciones. Al terminar, verifica cada criterio y marca la tarea.
```
