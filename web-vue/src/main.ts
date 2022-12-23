import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";
import dayjs from "dayjs";
import dayjsRelative from "dayjs/plugin/relativeTime";
import dayjsUpdateLocale from "dayjs/plugin/updateLocale";
import { createApp } from "vue";

import { i18nPlugin } from "@localization";
import { componentsPlugin } from "@plugins/components";
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

// TODO: Actually check that this is working...
dayjs.extend(dayjsRelative, {
  thresholds: [
    // Up to 35 hours is considered a "day"
    { l: "d", r: 35, d: "hour" },
    // Up to 25 days is considered "# days"
    { l: "dd", r: 25, d: "day" },
    // Up to 45 days is considered a "month"
    { l: "M", r: 45, d: "day" },
    // Up to 10 months is considered "# months"
    { l: "MM", r: 10, d: "month" },
    // Up to 17 months is considered a "year"
    { l: "y", r: 17, d: "month" },
    // Past is considered "# years"
    { l: "yy", d: "year" },
  ],
});
dayjs.extend(dayjsUpdateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    past: "%s",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

const app = createApp(App);

app.use(i18nPlugin);
app.use(vuetifyPlugin);
app.use(componentsPlugin);
app.use(directivesPlugin);
app.use(rootPiniaStore);
app.use(router);

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        // Queries are considered stale after 1 minute
        staleTime: 1 * 60 * 1000,
        // Only retry failed requests once
        retry: 1,
        // Reduce repeated fetch requests (especially in development)
        refetchOnWindowFocus: false,
        // Only refetch when mounting if data is stale
        refetchOnMount: true,
      },
    },
  },
};
app.use(VueQueryPlugin, vueQueryOptions);

app.mount("#app");
