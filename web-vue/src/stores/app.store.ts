import { defineStore } from "pinia";
import { ref } from "vue";

export type AppTheme = "light" | "dark";

export const useAppStore = defineStore("app", () => {
  const theme = ref<AppTheme>("light");
  const setTheme = (themeName: AppTheme) => {
    theme.value = themeName;
  };

  return {
    setTheme,
    theme,
  };
});
