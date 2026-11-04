# Fanzine N°1 — Portfolio de Yazmin Kussi

Examen final de **Programación Multimedial IV**.

> **URL publicada:** _(completar después del deploy)_
> **Repositorio:** _(completar)_

## La propuesta

Mi portfolio es un **fanzine risograph**: un papel claro, dos tintas (rosa y azul) que se superponen,
recortes, cinta y notas escritas a mano. Lo elegí porque así guardo las cosas que me gustan: recortadas
y pegadas. Además, junta las tres cosas que hago (diseño visual, código e imagen) en un formato que se
siente hecho a mano aunque sea digital.

El recorrido son seis "páginas":

| N° | Página | Qué cuenta |
| --- | --- | --- |
| 01 | **hola** | Portada: quién soy, en una línea |
| 02 | **yo** | Sobre mí: cómo pienso y qué me interesa |
| 03 | **trabajos** | Proyectos como recortes que se abren en una ficha |
| 04 | **inspo** | Moodboard vivo con obras de un museo real (API) |
| 05 | **mesa** | Mesa de collage: quien visita arma su propia página |
| 06 | **chau** | Contraportada y contacto |

El momento más importante es la **mesa de collage**: no es solo mirar mi portfolio, sino jugar con él.
Las obras que te gustan del moodboard se pegan en la mesa y se mezclan con mis stickers. Así, cada visita
termina con un collage distinto.

**Público:** docentes y compañeros de la carrera, estudios de diseño y equipos que buscan un perfil
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
- **Sin frameworks extra (React, etc.) ni Tailwind.** La interacción es chica y concreta, así que
  alcanza con TypeScript nativo. Menos peso y puedo explicar cada línea.
- **CSS propio con variables** (`src/styles/global.css`): paleta, tipografías y curvas de animación en
  un solo lugar. El grano de impresión es un SVG con ruido (`feTurbulence`) encima de todo.
- **Tipografías (Google Fonts):** Instrument Serif (títulos), Space Grotesk (texto), Caveat (notas a mano).
- **Movimiento con criterio:** solo animo `transform` y `opacity`, uso curvas `ease-out` fuertes, nada
  arranca desde `scale(0)`, lo que se hace con teclado es instantáneo y el hover solo existe con mouse.

### Estructura

```
src/
├── components/
│   ├── Indice.astro           navegación + scroll-spy
│   ├── Portada.astro          portada con entrada escalonada y parallax
│   ├── TarjetaProyecto.astro  recorte + ficha (<dialog>)
│   ├── Moodboard.astro        API del museo con estados
│   └── MesaDeCollage.astro    stickers arrastrables con física
├── data/proyectos.ts          contenido de los proyectos
├── layouts/Base.astro         <head>, fuentes, "saltar al contenido"
├── pages/index.astro          arma el fanzine
└── styles/global.css          paleta, tipografía, utilidades
```

## Componentes propios

1. **`Indice`**: la navegación. Es una barra inferior en celular y una columna fija en escritorio. Con un
   `IntersectionObserver` marca la página que estás leyendo (`aria-current`).
2. **`TarjetaProyecto`**: recibe un proyecto (`src/data/proyectos.ts`) y lo muestra como recorte, con una
   inclinación distinta según su posición y una tapa riso generada con CSS (o una imagen, si se la paso).
   Al tocarlo abre una ficha con `<dialog>` nativo, que ya resuelve el foco, el cierre con Esc y la
   devolución del foco. También se cierra tocando el fondo.
3. **`Moodboard`**: consume la API del museo. Tiene chips de temas y un buscador. Resuelve los estados de
   carga, contenido, vacío y error (ver abajo). Cada obra tiene un botón "Pegar en la mesa" que dispara
   un evento `mesa:pegar`.
4. **`MesaDeCollage`**: stickers arrastrables con mouse, dedo o teclado. Física propia y simple: inercia
   con fricción al soltar, inclinación según la velocidad con un resorte y rebote suave en los bordes.
   Escucha `mesa:pegar` para sumar obras y guarda el collage en `localStorage`.
5. **`Portada`** (de apoyo): entrada escalonada de los recortes y un parallax leve con el mouse.

**Cómo se comunican Moodboard y Mesa:** no se importan entre sí. El moodboard emite
`window.dispatchEvent(new CustomEvent("mesa:pegar", { detail }))` y la mesa lo escucha. Así cada
componente sigue siendo independiente.

## API: Victoria and Albert Museum

- **Fuente:** API pública de colecciones del V&A, Londres → https://developers.vam.ac.uk/ (no necesita clave).
- **Pedido:** `GET https://api.vam.ac.uk/v2/objects/search?q=<tema>&images_exist=1&page_size=18`
- **Qué uso:** título, autor, fecha y la URL base IIIF de la imagen. Pido cada imagen al ancho justo que
  necesito (`.../full/400,/0/default.jpg`).
- **Límites y errores:**
  - **Cargando:** muestra esqueletos de papel y `aria-busy`.
  - **Error** (sin conexión o la API cae): mensaje "Se trabó la imprenta" con botón **Reintentar**.
  - **Timeout:** si tarda más de 8 s, cancelo el pedido con `AbortController` y muestro el error.
  - **Vacío:** si la búsqueda no trae obras con imagen, aparece "Página en blanco" con una sugerencia.
  - **Imagen rota:** si una sola imagen falla, saco esa obra y el resto sigue.
  - **Pedidos encimados:** si cambiás de tema rápido, cancelo el pedido anterior.
  - **Cache** por sesión (`sessionStorage`) para no repetir pedidos.
  - **Carga diferida:** recién pido a la API cuando el moodboard está por aparecer en pantalla.
  - Los cambios de estado se anuncian con `aria-live`.
- Primero usé la API del Art Institute of Chicago, pero bloquea los pedidos desde el navegador (403 de
  Cloudflare). Lo cuento en la [bitácora](docs/PROCESO.md).

## Responsive y accesibilidad

- **Mobile first.** El índice pasa de barra inferior (celular) a columna lateral (≥ 1024 px). La portada
  y "sobre mí" pasan de una a dos columnas (≥ 860 px). Los proyectos usan una grilla `auto-fill`.
- Tipografía fluida con `clamp()`. Probé en 375 px, 768 px y escritorio, sin scroll horizontal.
- **Táctil:** áreas de toque de 44 px como mínimo, `touch-action: none` en los stickers para que
  arrastrar no scrollee la página e inputs de 16 px para que el celular no haga zoom.
- **Contraste:** el texto principal es tinta `#23324a` sobre papel `#f3eee4`. El rosa claro solo se usa
  en formas y títulos grandes; para texto chico uso `#b23e5d`, que pasa AA.
- **Teclado:** link "Saltar al contenido", foco visible en todo y stickers que se mueven con flechas
  (Shift = más rápido) y se quitan con Supr. La ficha de proyecto es un `<dialog>` modal.
- **Lectores de pantalla:** `lang="es"`, landmarks (`nav`, `main`, `section` con `aria-labelledby`),
  `alt` en las obras (título + autor), decoraciones con `aria-hidden` y anuncios con `aria-live`.
- **Movimiento reducido:** con `prefers-reduced-motion` se apagan las animaciones, el parallax y la
  inercia.

## Limitaciones y mejoras posibles

- Las tapas de los proyectos son composiciones CSS. Falta reemplazarlas por capturas reales (campo
  `imagen` en `src/data/proyectos.ts`).
- El moodboard busca mejor en inglés (es la lengua de la API). Podría traducir los temas automáticamente.
- El collage se guarda solo en tu navegador. Una mejora sería poder exportarlo como imagen.
- Agregar una página propia por proyecto (`/proyectos/[slug]`) con más proceso e imágenes.

## Créditos y licencias

- Imágenes del moodboard: © Victoria and Albert Museum, Londres, vía su API pública. Uso no comercial,
  según sus [términos](https://www.vam.ac.uk/info/va-websites-terms-conditions).
- Tipografías: Instrument Serif, Space Grotesk y Caveat, de Google Fonts (SIL Open Font License).
- *Dunkin'* es una marca de sus respectivos dueños. El rediseño es un ejercicio académico sin relación oficial.
- Karaoke interactivo: proyecto grupal con Iara Churba y Rocío Prieto Valdez.

## Uso de inteligencia artificial

Ver la sección **"Uso de IA"** en la [bitácora de proceso](docs/PROCESO.md).
