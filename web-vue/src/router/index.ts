import { createRouter, createWebHistory } from "vue-router";

import { applyRouterGuards } from "./guards";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

applyRouterGuards(router);

export default router;
