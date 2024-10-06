import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/pdf-tools/",
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pdf-tools/logo.svg",
            purpose: "any",
            sizes: "any",
            type: "image/svg+xml"
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      base: "/pdf-tools/",
      injectRegister: 'auto'
    })
  ]
});