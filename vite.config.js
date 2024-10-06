import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist"
  },
  resolve: {
    alias: { "/src": path.resolve(process.cwd(), "src") }
  },
  base: "/pdf-tools/",
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: "#ffffff",
        icons: [
          {
            src: "logo.svg",
            purpose: "any",
            sizes: "any",
            type: "image/svg+xml"
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      srcDir: "src",
      base: "/pdf-tools/",
      injectRegister: 'auto',
    })
  ]
});