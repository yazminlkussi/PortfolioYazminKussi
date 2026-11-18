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
  imagenes?: { src: string; alt: string; ancho?: number; alto?: number }[]; // capturas reales en /public (reemplazan las composiciones)
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
    archivos: ["nodo_login.png", "comunidad.png"],
    enlaces: [{ texto: "Ver Nodo en vivo", url: "https://nodo-wheat.vercel.app/" }],
    imagenes: [
      {
        src: "/proyectos/nodo-login.png",
        alt: "Pantalla de ingreso de Nodo: logo, la frase \"Experiencia digital para comunidades\" y un formulario para ingresar o crear cuenta, sobre fondo violeta.",
        ancho: 751,
        alto: 791,
      },
    ],
  },
  {
    slug: "karaoke",
    titulo: "Karaoke interactivo",
    tipo: "Experiencia interactiva · Redes y Tecnología",
    anio: "2026",
    resumen:
      "Sentite un cantante profesional, viví tu era popstar: la pantalla grande es el escenario y tu celular, el control.",
    descripcion: [
      "Una sala, un QR, una fila. Escaneás el QR y desde el celu elegís si querés cantar o solo reaccionar: te anotás, buscás tu canción y esperás tu turno sin interrumpir a nadie.",
      "Mientras cantás pasan cosas: retos con las manos que reconoce la cámara, completar la palabra que falta, reacciones del público desde sus celus y un aliento si dejás de cantar. Tu puntaje entra al top de la noche.",
      "Empezó como un generador de videos con filtros, pero lo interesante no era el video sino la experiencia. El video sigue: si lo pedís, te llevás un QR con tu clip.",
    ],
    rol: "Entre las tres, de la idea al deploy",
    herramientas: ["Astro", "Node.js + Socket.IO", "MediaPipe", "YouTube Data API", "LRCLIB", "Supabase", "FFmpeg"],
    equipo: "Con Iara Churba y Rocío Prieto Valdez",
    nota: "viví tu era popstar ★",
    portada: "karaoke",
    archivos: ["escenario.mov", "celu_fila.png"],
    enlaces: [{ texto: "Ver el karaoke en vivo", url: "https://karaoke-beta-azure.vercel.app/" }],
  },
  {
    slug: "dunkin",
    titulo: "Dunkin', versión de lujo",
    tipo: "Rediseño de marca · manual de identidad",
    anio: "2026",
    resumen:
      "Dunkin pero con elegancia: la cafetería de barrio con aire de pastelería de autor.",
    descripcion: [
      "Tomé una marca masiva, pop y colorida y la llevé a un universo refinado y cálido. El propósito: regalar un momento de pausa dulce en medio del ritmo diario. Su personalidad: elegante, cálida y artesanal.",
      "Armé el manual de identidad completo: logotipo y monograma DD con su área de seguridad y tamaños mínimos, una paleta de bordó, bordó profundo, crema y arena, y la tipografía The Seasons para títulos con Cormorant para el texto.",
      "El sistema se completa con patrones de donas a línea y del monograma repetido, aplicados en vasos, bolsas, cartelería y menú. Proyecto académico, sin relación oficial con la marca.",
    ],
    rol: "Concepto, identidad visual y manual de marca",
    herramientas: ["Illustrator", "Photoshop", "Figma"],
    nota: "una pausa dulce ✶",
    portada: "marca",
    archivos: ["carteleria.jpg", "vaso_bandeja.jpg"],
    imagenes: [
      {
        src: "/proyectos/dunkin-carteleria.jpg",
        alt: "Cuadro bordó con el patrón del monograma DD y la palabra DUNKIN en crema, colgado en una pared en penumbra.",
        ancho: 1000,
        alto: 747,
      },
      {
        src: "/proyectos/dunkin-vaso.jpg",
        alt: "Vaso de café bordó con el logo DUNKIN sobre una bandeja, junto a una servilleta con el patrón del monograma.",
        ancho: 640,
        alto: 482,
      },
    ],
  },
];
