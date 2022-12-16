import { createPinia } from "pinia";

const rootPiniaStore = createPinia();

export { rootPiniaStore };

export { useAppStore } from "./app.store";
export type { AppTheme } from "./app.store";
