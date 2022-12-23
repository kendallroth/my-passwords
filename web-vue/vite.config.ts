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
        scss: {
          // Some SCSS files (vars, mixins, etc) should automatically be imported in all SCSS files,
          //   including SFC template blocks, to reduce common SCSS imports.
          additionalData(source: string, fp: string) {
            // NOTE: Both '@use' and '@forward' rules MUST be some of the first rules
            //         in an SCSS file! Therefore, if the Vuetify overrides has any
            //         SCSS imports prepended, it will break this order and cause errors!
            if (fp.endsWith("vuetify.scss")) {
              return source;
            }

            return `
              @import "@styles/_breakpoints.scss";
              @import "@styles/_functions.scss";
              @import "@styles/_vars.scss";
              ${source}
            `;
          },
        },
      },
    },
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      // NOTE: Ran into an odd issue where any HMR updates broke due to the following error. This plugin sorta patches
      //         this out, but I am not sure at what cost...
      // Error: "ReferenceError: Cannot access page before initialization"
      // Source: https://github.com/vitejs/vite/issues/3033#issuecomment-1360691044
      {
        name: "singleHMR",
        handleHotUpdate({ modules }) {
          modules.forEach((m) => {
            m.importedModules = new Set();
            m.importers = new Set();
          });
          return modules;
        },
      },
    ],
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
