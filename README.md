# Landing `uru.pe/ventilador-clip`

Landing page de un solo producto (**Ventilador Portátil Clip 360°**, importado por URU) construida con HTML, CSS y JavaScript puro, desarrollada con *Spec-Driven Development*. La fuente de verdad está en `specs/`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala `sharp` (solo para el script de assets) |
| `npm run assets` | Convierte y renombra imágenes/videos de `assets/_origen/` según `scripts/mapa-assets.json` |
| `npm run serve` | Servidor local en http://localhost:8080 |
| `npm run check` | Valida el HTML y mide la carga inicial (< 400 KB) |

## Antes de publicar: reemplazar placeholders

Todo lo que está entre corchetes (`[CORREO_URU]`, `[NOMBRE_FABRICANTE]`, …) es un dato pendiente. Se cambia en **dos lugares**:

1. **`script.js` → objeto `CONFIG`** (arriba del archivo). Es el único punto de configuración: al cargar la página rellena textos, enlaces de WhatsApp, links de pago y redes.
2. **El HTML** (`index.html` y `politicas/*.html`) trae los mismos placeholders como texto de respaldo (por si el JS no carga y para buscadores). Búscalos con:

   ```bash
   grep -n "\[" index.html politicas/*.html
   ```

   Además del texto visible, revisa en `index.html` el JSON-LD (`"brand": { "name": "[NOMBRE_FABRICANTE]" }`) y los `href` de redes (`[ENLACE_INSTAGRAM]`, etc.).

Los datos técnicos marcados `[CONFIRMAR …]` (autonomía, tiempo de carga, uso durante carga) **no se inventan**: se completan solo cuando estén verificados con el producto real.

## WhatsApp

- En `CONFIG.WHATSAPP` pon el número **solo con dígitos y código de país**, por ejemplo `51987654321`. Se aceptan espacios o `+` (se eliminan solos).
- Los mensajes están en `CONFIG.MENSAJES` (general y uno por combo) y se codifican con `encodeURIComponent`, así que tildes y emoji funcionan.
- Mientras el número sea el placeholder, los botones abren `wa.me` sin número (WhatsApp deja elegir el chat).
- `CONFIG.ENLACES.WHATSAPP_BUSINESS` es el enlace del perfil de WhatsApp Business para el botón de redes.

## Links de pago

`CONFIG.PAGOS` tiene tres posiciones: combo de 1, de 2 y de 3 unidades. Si una posición no es un enlace `https://…`, ese botón abre WhatsApp con el mensaje del combo.

Cómo obtener un link de pago por monto fijo: Mercado Pago, Culqi e Izipay ofrecen "links de pago" desde su panel o app. Crea uno por combo, con monto fijo (S/ 45, S/ 80 y S/ 105) y una descripción del tipo "Ventilador Portátil Clip 360° — combo de 2". Copia cada enlace en su posición de `CONFIG.PAGOS`. Los menús cambian seguido; si no encuentras la opción, revisa la ayuda oficial de cada pasarela.

Recuerda poner el nombre de la pasarela en `CONFIG.PASARELA_PAGO` (aparece en la FAQ y en los términos).

## Stock limitado

`CONFIG.STOCK_LIMITADO = false` oculta la insignia "Stock limitado" del hero y la línea "Quedan pocas unidades de este lote." Úsalo en cuanto deje de ser cierto (inventario inicial: 10 unidades).

## Reseñas reales

El bloque "Lo que dicen nuestros clientes" está oculto hasta que haya reseñas **reales**. Para mostrarlas:

```js
RESEÑAS: [
  { nombre: "Nombre del cliente", distrito: "Distrito", texto: "Lo que escribió, tal cual." }
],
```

Se pintan con `textContent` (no se interpreta HTML). No inventes reseñas.

## Fotos y videos

1. Descarga la carpeta del Drive y descomprímela en `assets/_origen/` (ignorada por git).
2. Instala `ffmpeg` (`winget install Gyan.FFmpeg` / `brew install ffmpeg`) y corre `npm run assets`.
3. El mapa de renombrado está en `scripts/mapa-assets.json` y documentado en `specs/05-assets.md`. El script admite recortes (`recorte`), fotogramas de video (`fotogramas`) y quitar bordes transparentes (`quitarBordes`).

Para cambiar una foto: reemplaza el original en `assets/_origen/`, ajusta la entrada en `mapa-assets.json` (manteniendo el nombre de destino en español) y vuelve a correr `npm run assets`. Si cambian las dimensiones, actualiza `width`/`height` del `<img>`.

**Pendientes de foto real:**

- Uso **"Coche de bebé"**: no hay foto de una tela. La tarjeta usa `ventilador-clip-producto-blanco.webp` y el texto dice que va enganchado a una tela, no al mango.
- Las fotos de Amazon con texto en inglés y datos sin verificar (mAh, horas, dB) se descartaron. Ver la nota en `specs/05-assets.md`.

## Analítica

`CONFIG.GA_ID` y `CONFIG.META_PIXEL_ID` existen pero **no se carga ningún script de seguimiento**. Si se decide activar, primero se actualiza la spec y después se añade el código.

## Publicar

La carpeta se sube tal cual; no hay build.

- **Vercel:** importa el repo como proyecto estático. `vercel.json` activa `cleanUrls` y reescribe `/ventilador-clip` y `/ventilador-clip/*` a la raíz del proyecto, así la landing responde en `https://uru.pe/ventilador-clip` y los assets relativos siguen funcionando. Asigna el dominio `uru.pe` (o haz que el sitio principal de `uru.pe` haga *rewrite* de `/ventilador-clip/*` hacia este proyecto).
- **Netlify:** arrastra la carpeta a *Deploys*. Para servirla bajo `/ventilador-clip`, publícala dentro de una subcarpeta `ventilador-clip/` del sitio de `uru.pe`, o usa un archivo `_redirects` con `/ventilador-clip/*  /:splat  200`.
- **GitHub Pages:** un repo llamado `ventilador-clip` publica en `https://<usuario>.github.io/ventilador-clip/` sin cambios. Con dominio propio, configura `uru.pe` en *Settings → Pages*.
- **Hosting compartido (cPanel):** sube la carpeta como `public_html/ventilador-clip/`. Apache redirige `/ventilador-clip` a `/ventilador-clip/` y todo funciona con rutas relativas.

Después de publicar, sigue el checklist de `specs/07-lanzamiento.md`.

## Estructura

```
ventilador-clip/
├── index.html, styles.css, script.js
├── politicas/           privacidad, terminos
├── assets/{img,video,logo}
├── robots.txt, sitemap.xml, vercel.json
├── scripts/             preparar-assets, verificar-peso, mapa-assets.json
├── specs/               visión, marca, requisitos, diseño, contenido, assets, tareas, lanzamiento
└── CLAUDE.md            reglas para agentes de código
```
