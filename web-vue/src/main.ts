import { createPinia } from "pinia";
import { createApp } from "vue";

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

app.use(createPinia());
app.use(router);

app.mount("#app");
