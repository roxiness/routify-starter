import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import viteMainJs from "vite-main-js";

export default defineConfig({
  server: {
    port: 5000,
  },
  build: { polyfillModulePreload: false },
  plugins: [svelte(), viteMainJs()],
});
