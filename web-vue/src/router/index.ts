import { createRouter, createWebHistory } from "vue-router";

import { CollectionList } from "@views/Collections";
import { PasswordList } from "@views/Passwords";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/collections",
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
  ],
});

export default router;
