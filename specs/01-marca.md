# 01 — Reglas de marca: URU es la importadora, no el fabricante

Violación de cualquier regla de este archivo = bug bloqueante. Revisar antes de cada commit.

## Qué es URU

URU (uru.pe) es la **empresa importadora y vendedora**. Importa productos y los distribuye en Perú con atención y garantía propias.

## Qué NO es URU

- No es la marca del ventilador.
- No es el fabricante.
- No tiene certificaciones, premios ni afiliaciones de marca con el fabricante.

## Nombre del producto

Siempre genérico y descriptivo: **Ventilador Portátil Clip 360°** (forma larga) o **ventilador clip** (forma corta en texto corrido). Alternativas aceptadas si el contexto lo pide: "Mini Ventilador de Pinza Recargable", "Ventilador Personal USB 360°".

Prohibido: "URU Ventilador", "Ventilador URU", "ventilador de URU", "el URU".

## Dónde aparece el logo URU y con qué texto

| Lugar | Logo | Texto acompañante obligatorio |
| --- | --- | --- |
| Header | Logo horizontal negro | "Importado por URU" |
| Bloque Garantías URU | Isotipo | "Atención y garantía URU" |
| Botón flotante / sticky de WhatsApp | Isotipo (pequeño) | — |
| Footer | Logo horizontal blanco | "Importado por URU" |

Nunca: el logo URU encima o al lado del nombre del producto en el hero, en las tarjetas de precio o en las fotos de producto.

## Frases permitidas

- "Importado por URU"
- "Distribuido por URU"
- "Producto importado por URU"
- "Atención y garantía URU"
- "Compra con respaldo URU"

## Ficha del producto (obligatoria, visible)

En el hero (texto pequeño bajo el precio) y en Garantías URU:

> Producto importado por URU. Marca del fabricante: [NOMBRE_FABRICANTE]

## Fotos

Las fotos de Amazon muestran el producto del fabricante: se usan sin añadir el logo URU encima. Las fotos propias pueden incluir el empaque URU (sticker/bolsa), porque ese sí es empaque de la importadora.

## Checklist de revisión de marca

- [ ] `grep -i "uru ventilador\|ventilador uru" index.html` devuelve 0 resultados.
- [ ] El H1 no contiene "URU".
- [ ] La ficha "Producto importado por URU. Marca del fabricante: …" aparece 2 veces.
- [ ] El `<title>` y la `meta description` nombran el producto genérico y a URU solo como vendedor.
- [ ] JSON-LD: `brand` = `[NOMBRE_FABRICANTE]`, `seller` = URU.
