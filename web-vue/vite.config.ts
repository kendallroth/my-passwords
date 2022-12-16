/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import vuetify from "vite-plugin-vuetify";

export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, process.cwd());

  const getPath = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

  return {
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    plugins: [vue(), vuetify({ autoImport: true })],
    resolve: {
      alias: {
        "@assets": getPath("assets"),
        "@components": getPath("components"),
        "@composables": getPath("composables"),
        "@config": getPath("config.ts"),
        "@localization": getPath("localization"),
        "@plugins": getPath("plugins"),
        "@router": getPath("router"),
        "@services": getPath("services"),
        "@stores": getPath("stores"),
        "@styles": getPath("styles"),
        "@typings": getPath("types"),
        "@utilities": getPath("utilities"),
        "@views": getPath("views"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(envConfig.VITE_PORT, 10),
    },
    test: {
      coverage: {
        reporter: ["text", "json-summary", "json"],
      },
      environment: "happy-dom",
      globals: true,
    },
  };
});
