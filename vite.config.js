import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap"],
          asscroll: ["@ashthornton/asscroll"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["three", "gsap", "@ashthornton/asscroll"],
  },
});
