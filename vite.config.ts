import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],

      workbox: {
        navigateFallbackDenylist: [
          /\.pdf$/i,
          /^\/case-studies\//i,
        ],
      },

      manifest: {
        name: "Horigine IT Solutions",
        short_name: "Horigine",
        description: "Technology services and technical staffing",
        theme_color: "#10131a",
        background_color: "#10131a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/Favicon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/Favicon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
