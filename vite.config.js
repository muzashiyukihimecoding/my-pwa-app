import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Auto update service worker
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"],
      manifest: {
        name: "TaskFlow - PWA Manager",
        short_name: "TaskFlow",
        description: "Aplikasi manajemen tugas offline-ready",
        theme_color: "#6C63FF",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "public/atom192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "public/atom512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // File-file apa saja yang mau di-cache untuk offline
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        // Cache untuk Google Fonts (biar keren)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
            },
          },
        ],
      },
    }),
  ],
});
