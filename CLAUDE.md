# Landing `uru.pe/ventilador-clip` — Guía para Claude Code

Este proyecto se desarrolla con **Spec-Driven Development**: nada se implementa si no está descrito en `specs/`. Si una tarea pide algo que las specs no cubren, primero se actualiza la spec, luego el código.

## Orden de lectura obligatorio antes de tocar código

1. `specs/00-vision.md` — objetivo, alcance, lo que NO se hace.
2. `specs/01-marca.md` — reglas de marca URU (importadora, no fabricante). **Cualquier violación es un bug bloqueante.**
3. `specs/02-requisitos.md` — requisitos funcionales y no funcionales, con criterios de aceptación.
4. `specs/03-diseno.md` — paleta, tipografías, layouts móvil/desktop, animaciones.
5. `specs/04-contenido.md` — copy final en español. Se copia literal; no se reescribe.
6. `specs/05-assets.md` — nombres de archivo amigables y mapa de uso de cada imagen/video.
7. `specs/06-tareas.md` — backlog ordenado. Se ejecuta una tarea a la vez, en orden.
8. `specs/07-lanzamiento.md` — checklist de QA y publicación.

## Reglas duras

- **Idioma:** todo el contenido visible, atributos `alt`, `title`, `aria-label`, meta tags, comentarios de código y mensajes del README en **español**. Nombres de clases CSS y variables JS en inglés corto (convención web), pero comentarios en español.
- **Stack:** HTML5 semántico + CSS3 puro + JavaScript vanilla. Prohibido: React, Vue, Next, Tailwind, Bootstrap, jQuery, fuentes de íconos, CDN de librerías. Única excepción externa: Google Fonts (una sola etiqueta `<link>`).
- **Archivos:** `index.html`, `styles.css`, `script.js`, `assets/`. Nada más en la raíz salvo `README.md`, `robots.txt`, `sitemap.xml` y las páginas de `politicas/`.
- **Marca:** URU es la importadora. El producto se llama **Ventilador Portátil Clip 360°**. Nunca "URU Ventilador", nunca el logo URU junto al nombre del producto como si fuera su marca. Ver `specs/01-marca.md`.
- **Nombres de archivo de assets:** en español, minúsculas, sin acentos, con guiones, descriptivos (`ventilador-clip-escritorio.webp`). Nunca nombres de Amazon ni IDs de Higgsfield. Ver `specs/05-assets.md`.
- **Datos no verificados:** se dejan como placeholder `[CONFIRMAR …]` visible. Nunca se inventan autonomía, mAh, certificaciones, reseñas ni ventas.
- **Rendimiento:** carga inicial móvil < 400 KB (sin contar video, que es `preload="none"`). Imágenes WebP con `width`/`height`. Lighthouse móvil ≥ 90 en Performance, Accesibilidad y SEO.
- **Accesibilidad:** contraste AA (4.5:1), áreas táctiles ≥ 48×48 px, foco visible, `<details>` nativo para FAQ, todo operable con teclado.

## Flujo de trabajo por tarea

1. Leer la tarea en `specs/06-tareas.md` y sus criterios de aceptación.
2. Implementar solo esa tarea.
3. Verificar cada criterio de aceptación (abrir en navegador, Lighthouse, validar HTML con `npx html-validate` si está disponible).
4. Marcar la tarea como `[x]` en `specs/06-tareas.md` con un comentario de una línea si hubo decisiones.
5. Commit con mensaje en español: `feat(seccion): descripción corta` / `fix: …` / `docs(specs): …`.

## Comandos útiles

- `npm run assets` — convierte y renombra las imágenes/videos descargados del Drive según `specs/05-assets.md` (requiere Node 18+ y ffmpeg).
- `npm run serve` — servidor local en `http://localhost:8080`.
- `npm run check` — valida HTML y muestra el peso de la carga inicial.

## Lo que Claude Code NO debe hacer

- No crear componentes, frameworks ni build steps.
- No añadir tracking sin que `[GA_ID]`/`[META_PIXEL_ID]` estén definidos.
- No traducir nada al inglés.
- No cambiar el copy de `specs/04-contenido.md` sin actualizar primero la spec.
