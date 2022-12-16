import { createI18n } from "vue-i18n";

import enCommon from "./en/common.json";
import enScreens from "./en/screens.json";
import esCommon from "./es/common.json";
import esScreens from "./es/screens.json";

export type Languages = keyof typeof messages;

const messages = {
  en: {
    common: enCommon,
    screens: enScreens,
  },
  es: {
    common: esCommon,
    screens: esScreens,
  },
};

export const i18nPlugin = createI18n({
  // Must be false in order to use Composition API
  legacy: false,
  locale: "en",
  fallbackLocale: "en", // set fallback locale
  messages,
});
