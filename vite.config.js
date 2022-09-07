import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    svelte({
      preprocess: [preprocess()],
    }),
  ],
});
