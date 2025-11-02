import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, // <-- fixed: added missing comma
  // For a user site (Abdelraouf-edits.github.io) use base "/"
  base: mode === "production" ? "/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["gsap", "lenis", "@studio-freight/lenis"],
          ui: ["lucide-react", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
        },
      },
    },
  },
}));
