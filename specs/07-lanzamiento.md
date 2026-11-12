# 07 — Checklist de lanzamiento

> Estado al 12-nov-2026: verificado en local (`npm run serve`, Chrome con emulación móvil y Lighthouse 12). Los puntos sin marcar dependen del dueño (datos reales, dispositivos físicos, dominio y publicación).

## Contenido y marca
- [ ] Todos los placeholders `[...]` reemplazados (`grep -n "\[" index.html politicas/*.html` solo muestra corchetes intencionales). — Pendiente: datos del dueño.
- [ ] Datos técnicos confirmados: autonomía, tiempo de carga, uso durante carga. — Pendiente: probar con el producto real.
- [x] Checklist de `01-marca.md` en verde.
- [x] Precios correctos en hero, tarjetas, sticky, JSON-LD y mensajes de WhatsApp.
- [x] "Stock limitado" solo si el stock real es ≤ 10. — Inventario inicial: 10. Poner `CONFIG.STOCK_LIMITADO = false` si cambia.
- [x] Ortografía revisada (tildes, "S/ " con espacio). — Precios con espacio no separable (`S/&nbsp;45`).

## Funcional
- [ ] Todos los botones de WhatsApp abren el chat con el mensaje correcto (probar en iPhone y Android). — Mensajes y codificación verificados en Chrome; falta probar en teléfonos reales con el número definitivo.
- [x] Links de pago abren el checkout correcto por combo, o hacen fallback a WhatsApp. — Fallback verificado; probar cada checkout cuando existan los links.
- [x] Enlaces de redes abren en pestaña nueva.
- [x] Video hero reproduce en desktop y no se descarga en móvil.
- [x] FAQ abre y cierra sin JS.
- [x] Páginas de políticas accesibles desde el footer.

## Técnico
- [x] Lighthouse móvil: Performance ≥ 90, Accesibilidad ≥ 95, SEO ≥ 95, Buenas prácticas ≥ 95. — 99 / 100 / 100 / 100 (desktop igual).
- [x] Carga inicial < 400 KB (`npm run check`). — 130 KB.
- [x] HTML válido (`npx html-validate index.html`). — También `politicas/*.html`.
- [x] Probado en 320, 375, 414, 768, 1024, 1440 px. — Sin desbordes horizontales.
- [ ] Probado en Safari iOS, Chrome Android, Chrome y Firefox desktop. — Solo Chrome desktop con emulación.
- [ ] Favicon visible; OG image previsualiza bien en WhatsApp (pegar el link en un chat). — Requiere la URL publicada.
- [x] `robots.txt` permite indexar; `sitemap.xml` incluye la landing y políticas.
- [x] Sin errores en consola.

## Publicación
- [ ] Desplegado en `https://uru.pe/ventilador-clip` (o subdominio acordado) con HTTPS.
- [ ] Redirección `www` → sin `www` (o viceversa) configurada.
- [ ] Analytics/Pixel activos solo si se decidió (`CONFIG.GA_ID` / `CONFIG.META_PIXEL_ID`).
- [ ] Link probado desde la bio de TikTok e Instagram y desde una publicación de Marketplace.
- [ ] Respaldo del repo en GitHub con tag `v1.0`.
