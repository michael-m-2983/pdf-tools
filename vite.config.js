import path from "node:path";
import process from "node:process";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from "vite-plugin-singlefile"

const buildMode = process.env.BUILD_MODE || "offline-html";

let plugins = [];
let basePath = "";
switch (buildMode) {
	case "normal":
		plugins = [
			VitePWA({
				registerType: 'autoUpdate',
				manifest: {
					theme_color: "#ffffff",
					icons: [
						{
							src: "/logo.svg",
							purpose: "any",
							sizes: "any",
							type: "image/svg+xml"
						}
					]
				},
				injectRegister: 'auto'
			})
		];
		break;
	case "github-pages":
		basePath = "/pdf-tools";
		plugins = [
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
		];
		break;
	case "offline-html":
		plugins = [
			viteSingleFile()
		];
		break;
}

export default defineConfig({
	base: basePath,
	plugins: plugins
});
