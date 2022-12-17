import { createRouter, createWebHistory } from "vue-router";

import { CollectionList } from "@views/Collections";
import { AppDashboard } from "@views/Dashboard";
import NotFound from "@views/NotFound.vue";
import { PasswordList } from "@views/Passwords";
import { AppSettings } from "@views/Settings";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: AppDashboard,
    },
    {
      path: "/collections",
      name: "collectionList",
      component: CollectionList,
    },
    {
      path: "/passwords",
      name: "passwordList",
      component: PasswordList,
    },
    {
      path: "/settings",
      name: "settings",
      component: AppSettings,
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: NotFound,
    },
  ],
});

export default router;
