import { useAccountStore } from "@stores";
import { AuthLogin } from "@views/Auth/Login";
import { AuthLogout } from "@views/Auth/Logout";
import { CollectionList } from "@views/Collections";
import { AppDashboard } from "@views/Dashboard";
import NotFound from "@views/NotFound.vue";
import { PasswordList } from "@views/Passwords";
import { AppSettings } from "@views/Settings";

import type { RouteRecordRaw } from "vue-router";

const unauthenticatedRoutes: RouteRecordRaw[] = [
  {
    path: "/auth/login",
    name: "authLogin",
    component: AuthLogin,
  },
].map((r) => ({ ...r, meta: { requiresNoAuth: true } }));

const authenticatedRoutes: RouteRecordRaw[] = [
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
].map((r) => ({ ...r, meta: { requiresAuth: true } }));

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: () => {
      // Redirect root route to login for unauthenticated users
      const account = useAccountStore();
      return account.authenticated ? "/dashboard" : "/auth/login";
    },
  },
  ...unauthenticatedRoutes,
  ...authenticatedRoutes,
  {
    path: "/auth/logout",
    name: "authLogout",
    component: AuthLogout,
  },
  {
    path: "/:catchAll(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
