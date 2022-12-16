import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";
import { createApp } from "vue";

import { i18nPlugin } from "@localization";
import { directivesPlugin } from "@plugins/directives";
import { vuetifyPlugin } from "@plugins/vuetify";
import { rootPiniaStore } from "@stores";

import App from "./App.vue";
import router from "./router";

import "@styles/app.scss";

// NOTE: Fonts should be loaded via installed '@fontsource' packages vs webfontloader, due to
//         benefits gained by self-hosting fonts.
// Source: https://fontsource.org/docs/introduction
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";

const app = createApp(App);

app.use(i18nPlugin);
app.use(vuetifyPlugin);
app.use(directivesPlugin);
app.use(rootPiniaStore);
app.use(router);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        // Queries are considered stale after 1 minute
        staleTime: 1 * 60,
        // Only retry failed requests once
        retry: 1,
        // Reduce repeated fetch requests (especially in development)
        refetchOnWindowFocus: false,
      },
    },
  },
};
app.use(VueQueryPlugin, vueQueryOptions);

app.mount("#app");
