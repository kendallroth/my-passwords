import { createI18n } from "vue-i18n";

import enCommon from "./en/common.json";

const messages = {
  en: {
    common: enCommon,
  },
};

const i18nPlugin = createI18n({
  // Must be false in order to use Composition API
  legacy: false,
  locale: "en",
  fallbackLocale: "en", // set fallback locale
  messages,
});

export { i18nPlugin };
