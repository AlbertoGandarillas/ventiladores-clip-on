# 00 — Visión y alcance

## Objetivo

Una landing page de un solo producto en `https://uru.pe/ventilador-clip` cuyo único objetivo es que el visitante **toque "Comprar ahora" o "Pedir por WhatsApp"**. Más del 80 % del tráfico llegará desde TikTok, Instagram y Facebook en celular, con conexión móvil.

## Producto

- Nombre comercial en la página: **Ventilador Portátil Clip 360°**.
- Descripción: ventilador de pinza, mini, sin aspas visibles, rotación 360°, recargable por USB, 3 velocidades.
- Fabricante de referencia: Ahuccf (se menciona solo en la ficha como `[NOMBRE_FABRICANTE]`).
- Precio: S/ 64.90 la unidad · 2 por S/ 109.90 · 3 por S/ 149.90.
- Inventario inicial: 10 unidades (justifica "stock limitado" mientras sea cierto).

## Quién vende

**URU** (uru.pe) es la importadora y vendedora. No es la marca del producto. Ver `01-marca.md`.

## Métricas de éxito del lanzamiento

| Métrica | Meta |
| --- | --- |
| Lighthouse móvil (Performance / Accesibilidad / SEO) | ≥ 90 / ≥ 95 / ≥ 95 |
| Carga inicial en móvil (sin video) | < 400 KB |
| Tiempo hasta CTA visible en móvil | < 2 s en 4G |
| Clics a WhatsApp o pago ÷ visitas | ≥ 8 % |

## Fuera de alcance (v1)

- Carrito, checkout propio, cuentas de usuario.
- Múltiples productos o catálogo.
- CMS o panel de administración.
- Blog, idiomas adicionales.
- Integración directa con pasarelas (v1 usa links de pago externos).

## Entregables

```
ventilador-clip/
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── img/      (WebP con nombres en español)
│   ├── video/    (MP4 comprimidos + posters)
│   └── logo/     (logo URU PNG/SVG)
├── politicas/    (privacidad, terminos, devoluciones, libro-de-reclamaciones)
├── README.md
└── specs/
```
