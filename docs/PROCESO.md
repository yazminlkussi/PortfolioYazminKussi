# Bitácora de proceso

> Las partes marcadas con ✍️ las tengo que escribir yo, con mis palabras.

## 1. El problema de comunicación

Quería un portfolio que no se leyera como un currículum, sino que mostrara cómo soy: risueña,
extrovertida, curiosa y muy visual. Me muevo entre el diseño visual, la programación y la imagen
(foto y video), y fuera de la facu me definen la música, el arte, el cine y la lectura.

El desafío: **que se sienta hecho a mano y personal, pero que siga siendo estético y prolijo.**
Colorido, pero no saturado.

## 2. Conceptos explorados

| Concepto | Idea | Por qué sí / por qué no |
| --- | --- | --- |
| Mixtape | El portfolio como reproductor: cada proyecto es un "tema" y se muestra lo que escucho (Last.fm) | Conectaba con la música y el karaoke, pero dejaba afuera lo gráfico |
| Película / créditos | Entrada, escenas y créditos finales, con mis pelis favoritas (TMDB) | Muy audiovisual, pero más lineal y menos interactivo |
| **Fanzine / collage** ✅ | Páginas de un fanzine, stickers, recortes y una mesa para armar tu propio collage | Junta diseño, código e imagen. Es juguetón como yo y deja que quien visita participe |

✍️ _Por qué lo elegí, con mis palabras:_

## 3. Dirección visual

Probé tres estéticas para el fanzine:

- **A · Pastel editorial:** crema, verde salvia, rosa empolvado y serif itálica.
- **B · Risograph suave ✅:** papel claro y dos tintas (rosa y azul) que se superponen con `mix-blend-mode: multiply`.
- **C · Lavanda y mandarina:** lila suave con acentos naranja y notas a mano.

Elegí **B** porque tiene más carácter gráfico (parece impreso de verdad) sin perder suavidad. La paleta
quedó en papel, dos tintas, sus versiones claras y un azul tinta para el texto.

Decisiones que salieron de ahí:
- Sombras **planas y corridas**, como una segunda pasada de tinta, en vez de sombras difusas.
- **Grano de impresión** con un SVG de ruido encima de todo.
- El "corrimiento de registro" en mi apellido: un `text-shadow` rosa desplazado.

✍️ _Bocetos, capturas o referencias (pegar acá o en `docs/img/`):_

### Segunda iteración: del fanzine al cuaderno de escritorio

Con la primera versión armada (fanzine risograph con scroll largo), sentí que le faltaba algo **más
moderno** y más mío. Junté referencias:
- un "recap" de proyectos con carpetas azules, fotos sueltas y un título con **cuadro de selección y
  manijas**, como en un programa de diseño;
- un **cuaderno anillado** con capturas en ventanas de macOS, un diálogo "Nuevo álbum" y **notas a mano
  con flechitas**;
- una hoja de **stickers de interfaz**: carpetas rosas, burbujas de mensaje, archivos, menús Copiar /
  Compartir, interruptores y el cursor pixelado.

Decisiones que tomé a partir de eso:
- El portfolio pasa a ser un **cuaderno donde pasás las hojas**, y **cada hoja es un proyecto**.
- Cambio de paleta: papel claro, negro, **rosa de carpeta** como acento y el azul de sistema para lo
  accionable. Dejé las dos tintas riso.
- Cambio de tipografía: **Inter Tight** fina y con poco espacio entre letras para los títulos (más
  moderna) y **Gochi Hand** para las notas a mano.
- Las capturas de proyectos van dentro de **ventanas de macOS** que hacen de marco de foto.
- Los stickers de la mesa ahora son **stickers de interfaz** (carpeta, burbuja, archivo, menú, switch,
  cursor).
- Sumé el **interruptor formal / risueña** en "sobre mí": así el switch no es solo decorativo, sino que
  cambia lo que leés.

Lo que se mantuvo de la primera versión: la API del museo, los estados, la mesa con física y el criterio
de animación.

✍️ _Capturas antes / después:_

## 4. Cómo evolucionó la estructura

1. Primero pensé en secciones clásicas: inicio, sobre mí, proyectos y contacto.
2. Las convertí en **páginas numeradas de un fanzine** (01 a 06), con nombres cortos que entran
   en una barra de celular: hola, yo, trabajos, inspo, mesa y chau.
3. Sumé la **mesa de collage** como interacción principal y la conecté con el moodboard. Así la API
   deja de ser un adorno: alimenta la interacción.

## 5. Interacciones: criterios

Seguí la filosofía de diseño de interfaces de Emil Kowalski:
- ¿Debería animarse? Lo que se repite mucho (mover stickers con teclado) **no** se anima.
- Curvas `ease-out` fuertes (`cubic-bezier(0.23, 1, 0.32, 1)`), nunca `ease-in`.
- Nada aparece desde `scale(0)`: la ficha entra desde `scale(0.96)` con opacidad.
- Botones con `scale(0.97)` al presionar y hover solo con mouse (`@media (hover: hover)`).
- Solo animo `transform` y `opacity`.
- En la mesa, el sticker sigue al dedo 1:1 y al soltarlo tiene inercia. Si es un "flick", sigue
  deslizándose. La inclinación es un resorte, así se siente vivo sin ser exagerado.

## 6. Pruebas en distintos tamaños

| Tamaño | Qué revisé | Resultado |
| --- | --- | --- |
| 375 × 812 (celular) | Índice abajo, portada en una columna, ficha de proyecto, mesa | Sin scroll horizontal y ficha legible |
| ~800 px (tablet/notebook chica) | Portada en dos columnas, grilla de proyectos | OK |
| Escritorio | Índice lateral, parallax, arrastre con mouse | OK |

✍️ _Agregar pruebas en mi celular real (modelo y navegador) y capturas:_

## 7. Problemas y soluciones

- **La API del Art Institute of Chicago dejó de responder desde el navegador.** Devolvía un 403 de
  Cloudflare y el moodboard caía en el estado de error. Lo bueno: el estado de error funcionaba.
  Probé otras APIs: la del Met Museum ya no tiene su buscador (retirado en 2026), así que pasé a la
  del **Victoria and Albert Museum**, que responde bien y tiene CORS abierto.
- **Pedidos encimados.** Si cambiaba de tema rápido, un pedido viejo podía pisar al nuevo. Lo
  resolví guardando un `AbortController` por pedido y cancelando el anterior.
- **"Empezar de cero" duplicaba los eventos de los stickers** porque volvía a inicializarlos. Ahora
  solo reinicia sus posiciones.
- **La cinta tapaba el texto de la nota** en la portada. La moví al borde superior del papel.
- **La barra de Astro en desarrollo tapaba el índice en el celular.** La desactivé en `astro.config.mjs`.
- **El collage no siempre se guardaba** en el navegador de pruebas, porque ahí las animaciones corrían
  muy lento y el guardado esperaba a que el sticker frenara. Ahora también guarda apenas lo soltás.

- **(v2) Una hoja oculta se seguía viendo.** La hoja de contacto aparecía debajo de la tapa porque su
  `display: flex` le ganaba al atributo `hidden`. Lo resolví con una regla `.hoja[hidden] { display: none !important }`.
- **(v2) La mesa empezaba oculta y medía 0 px**, así que los stickers quedaban todos en la esquina. Ahora
  la mesa se arma recién la primera vez que tiene tamaño (`ResizeObserver`). Si pegás una obra antes de
  abrir la mesa, queda anotada en `localStorage` y aparece cuando llegás.
- **(v2) Animaciones de hoja que se pisaban** si pasabas muy rápido. Guardo la animación en curso y,
  si llega otra, la cancelo y dejo todo prolijo antes de empezar la nueva.
- **(v2) En pantallas medianas la hoja de proyecto empezaba con un bloque de texto.** Reordené para que,
  en una columna, abra con el collage visual.

✍️ _Otros problemas que encuentre:_

## 8. Pendiente / mejorable

- Reemplazar las tapas CSS de los proyectos por capturas reales.
- Completar mis links de contacto (mail, Instagram, LinkedIn, GitHub).
- Sumar más proyectos (hay un lugar reservado: "este espacio está esperando el próximo recorte").
- Exportar el collage como imagen.

## 9. Uso de IA

Usé **Claude (Anthropic)** como asistente durante el proceso.

**Para qué la usé:**
- Leer la consigna y organizar los requisitos.
- Proponer conceptos y direcciones visuales: yo elegí el fanzine y la estética B.
- Generar la primera versión del código de los componentes, el CSS y este README.
- Probar el sitio en el navegador (escritorio y celular) y detectar errores (API bloqueada, cinta
  encima del texto, eventos duplicados).

**Decisiones que tomé yo:**
- El concepto (primero fanzine / collage, después cuaderno de escritorio) y la estética.
- Las referencias visuales de la segunda versión (las busqué y se las pasé).
- Qué proyectos mostrar y cómo describirlos (Nodo, Karaoke y el rediseño de Dunkin').
- Que se sintiera estético y "colorido pero no tanto".
- Aplicar la filosofía de diseño de Emil Kowalski.

✍️ _Qué revisé, cambié o descarté del código generado:_

✍️ _Qué errores o límites de la IA detecté:_

✍️ _Qué partes del código puedo explicar y modificar (repasar antes de la defensa):_
