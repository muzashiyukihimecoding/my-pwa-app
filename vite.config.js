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
        description: "Aplikasi Manajemen Tugas Offline dengan Vite + PWA",
        theme_color: "#6C63FF",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/atom192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/atom512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/desktop-ss.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/mobile-ss.png",
            sizes: "720x1600",
            type: "image/png",
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
