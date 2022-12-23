import { ConfirmDialog } from "@components/dialog";
import { ActionBar, LayoutStack } from "@components/layout";

import type { App } from "vue";

/**
 * Register globally available components
 *
 * NOTE: Global components should be defined in '@typings/shims/components.d.ts' in order to
 *         utilize editor type/prop completion.
 */
export const componentsPlugin = {
  install: (app: App) => {
    // Layout
    app.component("ActionBar", ActionBar);
    app.component("LayoutStack", LayoutStack);
    // Dialogs
    app.component("ConfirmDialog", ConfirmDialog);
  },
};
