// Datos de los proyectos. Para sumar uno nuevo, agregá un objeto a la lista:
// el cuaderno crea una hoja nueva automáticamente.

export type Portada = "nodo" | "karaoke" | "marca";

export interface Proyecto {
  slug: string;
  titulo: string;
  tipo: string;
  anio: string;
  resumen: string; // una línea para la tarjeta
  descripcion: string[]; // párrafos para el detalle
  rol: string;
  herramientas: string[];
  equipo?: string;
  nota?: string; // nota escrita "a mano" sobre el recorte
  portada: Portada; // qué composición CSS se usa mientras no haya capturas
  archivos: [string, string]; // nombres que aparecen en las barras de las ventanas
  imagenes?: { src: string; alt: string }[]; // capturas reales en /public (reemplazan las composiciones)
  enlaces?: { texto: string; url: string }[];
}

export const proyectos: Proyecto[] = [
  {
    slug: "nodo",
    titulo: "Nodo",
    tipo: "Web app responsive · proyecto propio",
    anio: "2026",
    resumen:
      "Una web app que une la gestión interna de una institución con la vida comunitaria de sus socios.",
    descripcion: [
      "NODO es una solución digital pensada para nuclear lo operativo y lo social de distintas instituciones: clubes deportivos, centros culturales, movimientos juveniles e instituciones sociales.",
      "El desafío fue juntar dos mundos que suelen vivir separados: la gestión administrativa interna (cuotas, actividades, inscripciones) y la experiencia comunitaria de quienes forman parte. Un mismo lugar para organizar y para pertenecer.",
    ],
    rol: "Todo: la idea, el diseño UX/UI y el desarrollo",
    equipo: "Proyecto individual, de punta a punta",
    herramientas: ["Figma", "Web app responsive"],
    nota: "gestión + comunidad",
    portada: "nodo",
    archivos: ["nodo_app.png", "comunidad.png"],
  },
  {
    slug: "karaoke",
    titulo: "Karaoke interactivo",
    tipo: "Instalación interactiva · stand",
    anio: "2026",
    resumen:
      "Un stand de karaoke donde la pantalla es el escenario y cada celular, tu pase para subir a cantar.",
    descripcion: [
      "Una instalación para un stand: una sala, un QR y muchas personas. Escaneás con el celu, te sumás a la fila, elegís tu canción y, cuando llega tu turno, la pantalla grande se vuelve escenario: muestra la letra, quién canta y quién sigue.",
      "Mientras cantás, la cámara reconoce los gestos de tus manos y te propone retos en vivo. El celular funciona como segunda pantalla y cambia según tu momento: público, en fila, tu turno o resultado.",
      "La estética es editorial, de afiche: fondo crema, tipografía negra enorme, halftone y una estrella magenta. Nada de luces de neón: la idea era que se sintiera como la tapa de una revista pop.",
    ],
    rol: "Diseño de experiencia, identidad visual y desarrollo",
    herramientas: ["Astro", "Node + Socket.IO", "MediaPipe", "Canvas 2D"],
    equipo: "Con Iara Churba y Rocío Prieto Valdez — Redes y Tecnología",
    nota: "viví tu era popstar ★",
    portada: "karaoke",
    archivos: ["escenario.mov", "celu_fila.png"],
  },
  {
    slug: "dunkin",
    titulo: "Dunkin', versión de lujo",
    tipo: "Rediseño de marca · identidad",
    anio: "2026",
    resumen:
      "¿Qué pasa si una marca masiva y pop se vuelve cara y elegante? Un ejercicio de reposicionamiento.",
    descripcion: [
      "Tomé una marca conocida por ser accesible, colorida y cotidiana y la llevé a un universo premium: la misma dona y el mismo café, pero contados como un objeto de deseo.",
      "El trabajo pasa por la tipografía, la paleta, el packaging y el tono: menos ruido, más aire y detalles que se sienten caros.",
      "Proyecto académico y personal, sin relación oficial con la marca.",
    ],
    rol: "Dirección de arte e identidad visual",
    herramientas: ["Illustrator", "Photoshop", "Figma"],
    nota: "en proceso ✶",
    portada: "marca",
    archivos: ["dunkin_lux.jpg", "paleta.png"],
  },
];
