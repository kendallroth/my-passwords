import type { App } from "vue";

/** Register globally available template directives */
export const directivesPlugin = {
  install: (app: App) => {
    /** Toggle element 'visibility' via 'v-visible' template directive */
    app.directive("visible", (el, binding) => {
      el.style.visibility = binding.value ? "visible" : "hidden";
    });
  },
};
