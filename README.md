# Cuaderno — Portfolio de Yazmin Kussi

Examen final de **Programación Multimedial IV**.

> **URL publicada:** https://portfolio-yazmin-kussi.vercel.app
> **Repositorio:** https://github.com/yazminlkussi/PortfolioYazminKussi

## La propuesta

Mi portfolio es un **cuaderno anillado** donde pasás las hojas, y **cada hoja es un proyecto**. Adentro,
cada página está armada como un escritorio digital: ventanas de macOS que hacen de marco de foto, carpetas
rosas, cuadros de diálogo, el cuadro de selección con manijas de los programas de diseño, el cursor
pixelado y notas escritas a mano con flechitas.

La idea mezcla dos mundos que son muy míos: el **cuaderno** donde junto referencias y la **pantalla**
donde diseño y programo. Es moderno y limpio (papel claro, tipografía grotesca fina, un rosa de acento),
pero con el toque personal de lo escrito a mano.

Las hojas del cuaderno:

| N° | Hoja | Qué cuenta |
| --- | --- | --- |
| 01 | **tapa** | Quién soy, con carpetas que llevan a cada proyecto |
| 02 | **sobre mí** | Mi presentación, con un interruptor que cambia el tono (profesional ↔ personal) |
| 03–05 | **nodo, karaoke, dunkin** | Una hoja por proyecto: texto, rol, herramientas y collage visual |
| 06 | **inspo** | Moodboard vivo con piezas de un museo real (API) |
| 07 | **mesa** | Mesa de collage: quien visita arma su propia página |
| 08 | **contacto** | Un diálogo "Nuevo proyecto" para escribirme |

Las interacciones que cambian la experiencia:
- **Agarrar la hoja y pasarla**: con el mouse o el dedo, la hoja gira en 3D sobre el espiral siguiendo
  tu mano. Si la soltás pasada la mitad (o con un movimiento rápido) se da vuelta; si no, vuelve.
- **El interruptor de tono** en "sobre mí", que cambia el texto que leés.
- **La mesa de collage**: pegás obras del moodboard y las mezclás con mis stickers. Cada visita termina
  con un collage distinto.

**Público:** docentes y compañeros de la carrera, estudios de diseño y marcas que buscan un perfil
multimedial (diseño + desarrollo) para pasantías o primeros trabajos.

## Cómo correrlo

Requisitos: **Node 22.12 o superior** y npm.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # sirve dist/ para probar el build
```

## Tecnologías y decisiones

- **AstroJS** (obligatorio). Uso componentes `.astro` y genero un sitio **100 % estático**: el HTML se
  arma en el build y el JavaScript llega solo donde hay interacción (scripts dentro de cada componente).
- **Sin frameworks extra (React, etc.) ni Tailwind.** La interacción es concreta, así que alcanza con
  TypeScript nativo. Menos peso y puedo explicar cada línea.
- **CSS propio con variables** (`src/styles/global.css`): paleta, tipografías, sombras y curvas de
  animación en un solo lugar.
- **Tipografías (Google Fonts):** Inter Tight (títulos y texto) y Gochi Hand (notas a mano).
- **Pasar la hoja arrastrando, con física simple y sin librerías:** el ángulo sale de la posición de tu
  mano (el borde que agarraste se proyecta como `radio · cos θ`, así que la hoja "sigue al dedo"). Al
  soltar decide por posición o por velocidad (un *flick* alcanza) y termina con un `requestAnimationFrame`
  con *ease-out* cuya duración depende de cuánto falta y de la velocidad. Se ve el **dorso** de la hoja
  después de los 90° (un segundo plano espejado con `backface-visibility`), la hoja se oscurece al
  levantarse y proyecta **sombra** sobre la de abajo.
- **Cuaderno realista con CSS puro:** espiral metálico (un SVG que se repite, con agujeros en la hoja),
  tapa de cartón rosa con textura, canto de hojas apiladas, papel punteado y esquina doblada que invita a
  agarrar la hoja.
- **Movimiento con criterio:** solo animo `transform` y `opacity`, uso curvas `ease-out` fuertes, nada
  arranca desde `scale(0)`, lo que se hace con teclado es instantáneo (incluido pasar la hoja con las
  flechas) y el hover solo existe con mouse.
- **La URL guarda la hoja** (`#nodo`, `#mesa`…): se puede compartir un proyecto puntual y el botón
  "atrás" del navegador funciona.

### Estructura

```
src/
├── components/
│   ├── Cuaderno.astro         hojas, índice y navegación (pasar la hoja)
│   ├── HojaProyecto.astro     una hoja por proyecto (texto + collage)
│   ├── InterruptorTono.astro  switch profesional / personal en "sobre mí"
│   ├── Moodboard.astro        API del museo con estados
│   ├── MesaDeCollage.astro    stickers arrastrables con física
│   ├── DialogoContacto.astro  diálogo "Nuevo proyecto" → mail
│   ├── VentanaMac.astro       (visual) ventana que hace de marco
│   ├── Seleccion.astro        (visual) cuadro de selección con manijas
│   ├── NotaMano.astro         (visual) nota escrita a mano con flecha
│   └── Carpeta.astro          (visual) carpeta tipo Finder, puede ser link
├── data/proyectos.ts          contenido de los proyectos
├── layouts/Base.astro         <head>, fuentes, "saltar al contenido"
├── pages/index.astro          arma el cuaderno
└── styles/global.css          paleta, tipografía, utilidades
```

## Componentes propios

1. **`Cuaderno`**: la navegación y la estructura. Recibe la lista de hojas y muestra una sola a la vez.
   La forma principal es **agarrar la hoja** (mouse o dedo): distingue un arrastre horizontal de un scroll
   vertical, no se activa sobre links, botones, campos ni la mesa, y en la primera y la última hoja la
   hoja solo "tironea" con freno. Como alternativa accesible (WCAG 2.2, *dragging movements*) hay
   pestañas, flechas del teclado y dos botones chicos. La URL guarda la hoja (`pushState` + `hashchange`).
   Cuando cambia la hoja, mueve el foco a la hoja nueva y lo anuncia a lectores de pantalla.
2. **`HojaProyecto`**: recibe un proyecto de `src/data/proyectos.ts` y arma su hoja. Para sumar un
   proyecto alcanza con agregar un objeto a la lista: se crean solas la hoja, la pestaña y la carpeta de la
   tapa. Si el proyecto tiene `imagenes`, las muestra en las ventanas. Si no, usa composiciones CSS.
3. **`Moodboard`**: consume la API del museo. Tiene temas y un buscador. Resuelve los estados de carga,
   contenido, vacío y error (ver abajo). Cada obra tiene un botón "Pegar en la mesa" que dispara un
   evento `mesa:pegar`.
4. **`MesaDeCollage`**: stickers arrastrables con mouse, dedo o teclado. Física propia y simple: inercia
   con fricción al soltar, inclinación según la velocidad con un resorte y rebote suave en los bordes.
   Escucha `mesa:pegar` y guarda el collage en `localStorage`. Como vive en una hoja que empieza oculta,
   recién se arma la primera vez que tiene tamaño (`ResizeObserver`).
5. **`InterruptorTono`**: un `<button role="switch">` que cambia entre la versión profesional y la personal de
   mi presentación.
6. **`DialogoContacto`**: valida que escribas algo y abre tu mail con el texto cargado (`mailto:`).

**Cómo se comunican Moodboard y Mesa:** no se importan entre sí. El moodboard emite
`window.dispatchEvent(new CustomEvent("mesa:pegar", { detail }))` y la mesa lo escucha. Así cada
componente sigue siendo independiente. Si pegás una obra antes de abrir la mesa, queda anotada en el
guardado y aparece cuando llegás.

## API: Victoria and Albert Museum

- **Fuente:** API pública de colecciones del V&A, Londres → https://developers.vam.ac.uk/ (no necesita clave).
- **Pedido:** `GET https://api.vam.ac.uk/v2/objects/search?q=<tema>&images_exist=1&page_size=18`
- **Qué uso:** título, autor, fecha y la URL base IIIF de la imagen. Pido cada imagen al ancho justo que
  necesito (`.../full/400,/0/default.jpg`).
- **Límites y errores:**
  - **Cargando:** muestra esqueletos y `aria-busy`.
  - **Error** (sin conexión o la API cae): un cuadro de diálogo "Se trabó la imprenta" con botón **Reintentar**.
  - **Timeout:** si tarda más de 8 s, cancelo el pedido con `AbortController` y muestro el error.
  - **Vacío:** si la búsqueda no trae piezas con imagen, aparece "Página en blanco" con una sugerencia.
  - **Imagen rota:** si una sola imagen falla, saco esa pieza y el resto sigue.
  - **Pedidos encimados:** si cambiás de tema rápido, cancelo el pedido anterior.
  - **Cache** por sesión (`sessionStorage`) para no repetir pedidos.
  - **Carga diferida:** recién pido a la API cuando abrís la hoja de inspo.
  - Los cambios de estado se anuncian con `aria-live`.
- Primero usé la API del Art Institute of Chicago, pero bloquea los pedidos desde el navegador (403 de
  Cloudflare). Lo cuento en la [bitácora](docs/PROCESO.md).

## Responsive y accesibilidad

- **Mobile first.** En celular el índice es una tira de pestañas que se desliza y cada hoja va en una
  columna, abriendo con el collage visual. Desde 900–980 px las hojas pasan a dos columnas y, desde
  1100 px, el índice se vuelve pestañas que salen del costado del cuaderno.
- En celular se agarra la hoja con el dedo (`touch-action: pan-y`: lo vertical sigue scrolleando y lo
  horizontal pasa la hoja).
- Arrastrar nunca es la única forma: pestañas, teclado y botones hacen lo mismo con un clic.
- Tipografía fluida con `clamp()`. Probé en 375 px, ~800 px y escritorio, sin scroll horizontal.
- **Táctil:** áreas de toque de 44 px como mínimo, `touch-action: none` en los stickers para que
  arrastrar no scrollee la página e inputs de 16 px para que el celular no haga zoom.
- **Contraste:** el texto es `#161616` y `#5b5b60` sobre papel `#f7f5f0`. El rosa claro se usa solo en
  formas; para texto rosa uso `#b4235a`, que pasa AA.
- **Teclado:** link "Saltar al contenido", foco visible en todo, flechas ← → para pasar de hoja y
  stickers que se mueven con flechas (Shift = más rápido) y se quitan con Supr. Las flechas no pasan la
  hoja cuando estás escribiendo o moviendo un sticker.
- **Lectores de pantalla:** `lang="es"`, landmarks (`nav`, `main`, `section` con `aria-labelledby`),
  pestañas con `aria-current="page"`, las hojas ocultas tienen `hidden` (no se leen), el foco pasa a la
  hoja nueva y se anuncia "Hoja 3 de 8: Nodo". El interruptor usa `role="switch"` y `aria-checked`.
  Decoraciones con `aria-hidden` y `alt` en las imágenes.
- **Movimiento reducido:** con `prefers-reduced-motion` pasar la hoja es un fundido simple y se apagan la
  inercia y las animaciones.

## Limitaciones y mejoras posibles

- Las ventanas de los proyectos muestran composiciones CSS. Falta reemplazarlas por capturas reales
  (campo `imagenes` en `src/data/proyectos.ts`) y poner mi foto en "sobre mí".
- El moodboard busca mejor en inglés (es la lengua de la API). Podría traducir los temas automáticamente.
- El collage se guarda solo en tu navegador. Una mejora sería poder exportarlo como imagen.
- La hoja gira como un plano rígido: una curvatura real del papel (*page curl*) necesitaría canvas/WebGL.

## Créditos y licencias

- Imágenes del moodboard: © Victoria and Albert Museum, Londres, vía su API pública. Uso no comercial,
  según sus [términos](https://www.vam.ac.uk/info/va-websites-terms-conditions).
- Tipografías: Inter Tight y Gochi Hand, de Google Fonts (SIL Open Font License).
- La estética de stickers de interfaz está inspirada en macOS/iOS. Los íconos (ventanas, carpetas, cursor,
  diálogo) están dibujados a mano en CSS/SVG, no son recursos de Apple.
- *Dunkin'* es una marca de sus respectivos dueños. El rediseño es un ejercicio académico sin relación oficial.
- Karaoke interactivo: proyecto grupal con Iara Churba y Rocío Prieto Valdez.

## Uso de inteligencia artificial

Ver la sección **"Uso de IA"** en la [bitácora de proceso](docs/PROCESO.md).
