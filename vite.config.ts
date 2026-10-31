import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Horigine Staffing",
        short_name: "Horigine",
        description: "Technology services and technical staffing",
        theme_color: "#10131a",
        background_color: "#10131a",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://horizon-staffing.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    proxy: {
      "/api": {
        target: "https://horizon-staffing.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
