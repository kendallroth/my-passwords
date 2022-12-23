import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export type AppTheme = "light" | "dark";

export interface UiFlags {
  drawerOpen: boolean;
}

const setupStore = () => {
  const uiFlags = ref<UiFlags>({
    drawerOpen: true,
  });

  const setUiFlags = (flags: Partial<UiFlags>) => {
    Object.keys(flags).forEach((key) => {
      const value = flags[key as keyof UiFlags] as boolean;
      uiFlags.value[key as keyof UiFlags] = value;
    });
  };

  const theme = ref<AppTheme>("light");
  const setTheme = (themeName: AppTheme) => {
    theme.value = themeName;
  };

  return {
    setTheme,
    setUiFlags,
    theme,
    uiFlags,
  };
};

export const useAppStore = defineStore("app", setupStore, {
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
