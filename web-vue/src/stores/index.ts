import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const rootPiniaStore = createPinia();

// Persist Pinia store in local storage
rootPiniaStore.use(
  createPersistedState({
    key: (key) => `my-passwords--${key}`,
  }),
);

export { rootPiniaStore };

export { useAppStore } from "./app.store";
export type { AppTheme } from "./app.store";
