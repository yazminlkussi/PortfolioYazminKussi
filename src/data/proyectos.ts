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
  carpeta?: { nombre: string; href: string; etiqueta: string }; // la carpeta del collage abre un archivo (ej. el manual en PDF)
}

export const proyectos: Proyecto[] = [
  {
    slug: "nodo",
    titulo: "Nodo",
    tipo: "Web app responsive · proyecto personal",
    anio: "2026",
    resumen:
      "Una web app para clubes y centros culturales que junta la administración y la vida en comunidad en un mismo lugar.",
    descripcion: [
      "Nodo reúne lo operativo y lo social de instituciones como clubes deportivos, centros culturales, movimientos juveniles y organizaciones sociales.",
      "La gestión administrativa (cuotas, actividades, inscripciones) y la experiencia de los socios suelen resolverse por separado. Diseñé Nodo para que convivan: el mismo producto sirve para organizar la institución y para sentirse parte de ella.",
    ],
    rol: "Idea, diseño UX/UI y desarrollo",
    equipo: "Proyecto individual",
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
      "Un karaoke para eventos donde la pantalla grande es el escenario y el celular de cada persona funciona como control.",
    descripcion: [
      "Una sala, un QR y una fila. Cualquiera escanea, elige desde el celular si quiere cantar o mirar, busca su canción y espera su turno sin cortar a quien está en el escenario.",
      "Durante la canción la cámara reconoce gestos y propone retos, aparece una palabra para completar y el público manda reacciones. Si te quedás en silencio, la pantalla te alienta. El puntaje entra al ranking de la noche.",
      "La primera idea era generar un video con filtros. En las pruebas vimos que lo valioso pasaba durante la canción, así que rediseñamos todo alrededor de esa experiencia. El video quedó como opción al final.",
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
      "Un ejercicio de reposicionamiento: llevar una marca masiva y pop al terreno de la pastelería de autor.",
    descripcion: [
      "Partí de una pregunta: qué le pasa a Dunkin' si deja de hablarle a la urgencia y le habla a la pausa. La marca nueva se apoya en tres atributos: elegante, cálida y artesanal.",
      "El sistema cambia el naranja y el rosa por bordó y crema, con arena para fondos secundarios y un bordó profundo para la noche. En tipografía combiné The Seasons para títulos con Cormorant para texto, y sumé un monograma DD para formatos chicos.",
      "Los patrones de donas a línea y del monograma se aplican en vasos, bolsas, cartelería y menú. El manual completo está en la carpeta. Proyecto académico, sin vínculo con la marca.",
    ],
    rol: "Concepto, identidad visual y manual de marca",
    herramientas: ["Illustrator", "Photoshop", "Figma"],
    nota: "una pausa dulce ✶",
    portada: "marca",
    archivos: ["carteleria.jpg", "vaso_bandeja.jpg"],
    carpeta: {
      nombre: "manual de marca",
      href: "/proyectos/dunkin-manual-de-marca.pdf",
      etiqueta: "Abrir el manual de marca de Dunkin' (PDF, 26 MB)",
    },
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
