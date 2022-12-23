import { createI18n } from "vue-i18n";
import { setLocale as setYupLocale } from "yup";

import enCommon from "./en/common.json";
import enScreens from "./en/screens.json";
import esCommon from "./es/common.json";
import esScreens from "./es/screens.json";
import { yupLocale } from "./yup-locale";

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

const I18N_KEY = "i18n-language";
export const detectLocale = (): Languages => {
  const languageKeys = Object.keys(messages);
  let languageKey: Languages = "en";
  const browserLanguageKey = navigator.language.split("-")[0];
  if (languageKeys.includes(browserLanguageKey)) {
    languageKey = browserLanguageKey as Languages;
  }

  const storedLanguageKey = localStorage.getItem(I18N_KEY);
  if (languageKeys.includes(storedLanguageKey ?? "")) {
    languageKey = storedLanguageKey as Languages;
  }

  return languageKey;
};

/** NOTE: Does not actually set the locale (managed through hooks) */
export const setAppLocale = (locale: Languages) => {
  i18nPlugin.global.locale.value = locale;

  localStorage.setItem(I18N_KEY, locale);
};

const i18nPlugin = createI18n({
  // Must be false in order to use Composition API
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: "en", // set fallback locale
  messages,
});

setYupLocale(yupLocale);

export { i18nPlugin };
