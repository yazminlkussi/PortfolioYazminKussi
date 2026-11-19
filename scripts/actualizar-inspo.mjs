// Actualiza las fotos de los temas fijos del moodboard (hoja "inspo").
// Uso:  node scripts/actualizar-inspo.mjs          (solo completa los temas que no tienen fotos)
//       node scripts/actualizar-inspo.mjs --todo   (vuelve a bajar todo y pisa la selección)
//
// Ojo: las fotos guardadas hoy están elegidas a mano (descarté las que no tenían la estética del
// tablero), así que conviene no usar --todo salvo que quiera rehacer esa curaduría.
//
// Por qué existe: Openverse tarda 15–25 s en responder una búsqueda nueva y a veces devuelve 500/504.
// En vez de depender de eso en cada visita (o en cada build), guardo el resultado en
// src/data/inspo.json. El sitio lo lee al instante y el buscador sigue consultando la API en vivo.

import { writeFile, readFile } from "node:fs/promises";

const TEMAS = [
  "pink aesthetic",
  "coffee aesthetic",
  "flowers aesthetic",
  "typography poster",
  "packaging design",
  "35mm film photography",
];
const DESTINO = new URL("../src/data/inspo.json", import.meta.url);
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
// Flickr: versión de 640 px (sufijo _z), suficiente para el tablero
const achicar = (u) =>
  u?.replace(/^(https:\/\/live\.staticflickr\.com\/\d+\/\d+_[0-9a-f]+)(_[a-z0-9])?\.(jpg|png)$/, "$1_z.jpg");

async function buscar(q) {
  const params = new URLSearchParams({ q, aspect_ratio: "tall", page_size: "20" });
  const res = await fetch(`https://api.openverse.org/v1/images/?${params}`, {
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return (json.results ?? [])
    .filter((r) => r.url || r.thumbnail)
    .map((r) => ({
      id: r.id,
      titulo: (r.title || "Sin título").trim(),
      autor: r.creator ? `foto: ${r.creator}` : "Autor desconocido",
      fecha: r.license ? `CC ${String(r.license).toUpperCase()}` : "",
      // la foto original (Flickr, Wikimedia…) carga más rápido que la miniatura de Openverse
      imagen: achicar(r.url) || r.thumbnail,
      original: r.thumbnail || r.url,
    }));
}

let actual = {};
try {
  actual = JSON.parse(await readFile(DESTINO, "utf8"));
} catch {}

const TODO = process.argv.includes("--todo");

for (const q of TEMAS) {
  if (!TODO && actual[q]?.length) {
    console.log(`= ${q}: ya tiene ${actual[q].length} fotos elegidas`);
    continue;
  }
  for (let intento = 1; intento <= 4; intento++) {
    try {
      const fotos = await buscar(q);
      if (fotos.length) {
        actual[q] = fotos;
        console.log(`✓ ${q}: ${fotos.length} fotos`);
        break;
      }
      throw new Error("vacío");
    } catch (e) {
      console.log(`… ${q}: intento ${intento} falló (${e.message})`);
      await espera(4000 * intento);
    }
  }
  await espera(3500); // Openverse permite 20 pedidos por minuto sin clave
}

await writeFile(DESTINO, JSON.stringify(actual, null, 2) + "\n");
console.log("Guardado en src/data/inspo.json");
