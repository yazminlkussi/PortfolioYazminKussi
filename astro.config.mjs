// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // La barra de herramientas de Astro en desarrollo tapaba el índice en celular
  devToolbar: { enabled: false },
});
