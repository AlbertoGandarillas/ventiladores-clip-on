# 03 — Diseño visual

Estilo: premium, limpio, mucho blanco, fotos grandes, **un solo color de acento para los botones**. URU aporta negro y amarillo solo en header, footer y bloque de confianza; el resto de la página habla de aire y frescura.

## Paleta (variables CSS en `:root`)

| Variable | HEX | Uso |
| --- | --- | --- |
| `--color-primario` | `#1C7ED6` | Títulos de sección, íconos, etiqueta "Más elegida", borde de tarjeta destacada |
| `--color-cta` | `#25B35A` | Fondo de todos los botones principales (Comprar ahora, Pedir por WhatsApp, Elegir mi combo) |
| `--color-cta-hover` | `#1E9A4C` | Hover/active de botones |
| `--color-fondo` | `#FFFFFF` | Fondo general |
| `--color-fondo-alterno` | `#EEF6FD` | Secciones alternadas: Beneficios, Comparativa, FAQ |
| `--color-texto` | `#141413` | Títulos y cuerpo |
| `--color-texto-secundario` | `#5B6470` | Subtítulos, notas (4.6:1 sobre blanco) |
| `--color-marca-negro` | `#141413` | Footer, header de políticas |
| `--color-marca-amarillo` | `#E0B100` | Solo logo y detalle del sello "Importado por URU" |
| `--color-urgencia` | `#E8590C` | Etiqueta "Stock limitado" (un solo uso) |
| `--color-borde` | `#E3E8EE` | Bordes de tarjetas y tabla |
| `--color-estrella` | `#C4840A` | Estrellas de los testimonios. No es el amarillo de la marca. |

Decisión pendiente del dueño: si prefiere el amarillo URU como acento de botones, cambiar solo `--color-cta` a `#E0B100` y `--color-cta-hover` a `#C49C00`, y el texto de botón a `#141413`.

### Decisiones de implementación (contraste AA)

- Texto de botones verdes: `--color-cta-texto: #141413` (6.7:1 sobre `#25B35A`; el blanco solo da 2.7:1).
- `--color-primario-oscuro: #1864AB` para texto pequeño en azul (etiqueta del hero, "Más elegida", número de paso). `#1C7ED6` da 4.2:1 y solo se usa en títulos grandes, íconos y bordes.
- Texto de urgencia pequeño en `#A33D06`; `--color-urgencia` se queda en el ícono de "Stock limitado".

### Decisiones de implementación (layout móvil)

- La imagen del hero es cuadrada, pero su alto se limita a `100svh − 470px` (mínimo 160 px, recorte `object-fit: cover`) para que "Comprar ahora" quepa sin scroll en 375×667.
- Header: el indicador "Envíos a todo el Perú" se muestra desde 480 px (en móvil ya aparece como insignia del hero). Bajo 360 px el sello "Importado por URU" va debajo del logo.

## Tipografía

- Títulos (`h1`–`h3`, precios): **Manrope 800**, `letter-spacing: -0.02em`.
- Cuerpo, botones, tabla: **Inter 400 / 600**.
- Carga: `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=Inter:wght@400;600&display=swap" rel="stylesheet">`.
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

Escala móvil / desktop:

| Elemento | Móvil | Desktop |
| --- | --- | --- |
| H1 | 32 px / 1.15 | 52 px / 1.1 |
| H2 | 26 px | 36 px |
| H3 | 18 px | 20 px |
| Cuerpo | 16 px / 1.6 | 17 px / 1.6 |
| Precio hero | 36 px | 44 px |
| Botón | 17 px, 600 | 17 px, 600 |

## Espaciado y forma

- Contenedor: `max-width: 1120px; padding-inline: 20px` (móvil) / `32px` (desktop).
- Sección: `padding-block: 48px` móvil / `88px` desktop.
- Radio: tarjetas 16 px, botones 12 px, imágenes 20 px.
- Sombra única: `0 8px 24px rgba(20,20,19,.08)`.
- Botones: alto 56 px, ancho 100 % en móvil, `min-width: 220px` en desktop. Ícono SVG 20 px a la izquierda del texto en el de WhatsApp.

## Layout móvil (320–767 px), de arriba abajo

1. Header 56 px sticky.
2. Hero: etiqueta → H1 → subtítulo → imagen cuadrada 100 % ancho → precio → botón primario → botón secundario → insignias en fila con scroll horizontal → ficha del fabricante (13 px, gris).
3. Problema y solución: texto → 3 situaciones apiladas → imagen.
4. Beneficios: grid 2 columnas, tarjetas con ícono arriba.
5. Cómo usarlo: 3 pasos apilados → video.
6. Usos: carrusel horizontal (`scroll-snap`), tarjetas 72 % de ancho, foto 4:3.
7. Comparativa: tabla con scroll horizontal si no cabe; primera columna sticky.
8. Precios: 3 tarjetas apiladas; la de 2 unidades con borde `--color-primario` y etiqueta.
9. Confianza: isotipo centrado → 2 bloques apilados (sin garantía ni cambios).
10. Testimonios: tarjetas apiladas (nota, título, texto, nombre).
11. FAQ: `<details>` a ancho completo.
12. Contacto: lista → grid de botones 2 columnas.
13. Llamado final: imagen → texto → botones.
14. Footer: columnas apiladas, fondo negro, texto blanco al 80 %.
14. Barra sticky inferior 56 px (precio + botón WhatsApp).

## Layout desktop (≥ 1024 px)

- Hero: grid 55/45, texto izquierda, video con poster derecha, botones en fila, insignias bajo los botones.
- Problema y solución: 2 columnas alternadas (texto 50 / imagen 50).
- Beneficios: 3 columnas. Usos: grid 4 columnas (sin carrusel). Precios: 3 columnas, la central elevada (`transform: translateY(-12px)`).
- Comparativa: tabla centrada, `max-width: 760px`. Testimonios: 2 columnas. FAQ: 2 columnas (`columns: 2` o grid).
- Contacto: datos a la izquierda, botones de redes a la derecha.
- Barra sticky inferior oculta.

## Animaciones

- Clase `.revelar` en bloques: `opacity: 0; transform: translateY(12px)`. Al intersectar (IntersectionObserver, `threshold: 0.15`) añade `.visible` con `transition: opacity .5s, transform .5s`.
- `@media (prefers-reduced-motion: reduce)` → sin transiciones, todo visible.
- Hover de botón: `transform: translateY(-1px)` + color hover. Nada más.

## Íconos (SVG inline, 24 px, `stroke-width: 1.8`, `aria-hidden="true"`)

rotacion-360, velocidad (tres barras), usb, pluma/ligero, pinza, silencio, escritorio, coche-bebe, cama, pesa, cocina, oficina, maleta, sol, check, equis, whatsapp, instagram, tiktok, facebook, youtube, mercado-libre (texto "ML" en círculo si no hay ícono oficial), bateria, enchufe, caja (isotipo URU simplificado para el sello).

## Logo URU

- Header: `assets/logo/uru-logo-horizontal-negro.png` (2× para retina, alto renderizado 28 px).
- Footer: `assets/logo/uru-logo-horizontal-blanco.png`.
- Sello y botón sticky: `assets/logo/uru-isotipo.svg` (o PNG 128 px).
- Favicon: `assets/logo/favicon-32.png`, `favicon-180.png` (apple-touch-icon), `favicon-512.png` (PWA opcional).
