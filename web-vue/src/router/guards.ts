import { useAccountStore } from "@stores";

import type { Router } from "vue-router";

const applyRouterGuards = (router: Router): void => {
  // Routing guards are primarily configured for protecting routes based on authentication
  router.beforeEach((to, from, next) => {
    // Determine whether app is loading initially or routing internally
    //   NOTE: Requires all routes to have "name" set in the routing config
    const routedByApp = Boolean(from.name);

    // User authentication is indicated by whether Pinia account object exists
    const accountStore = useAccountStore();
    const authenticated = accountStore.authenticated;

    // Some routes require authentication (all matching routes must be checked)
    const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth);
    if (requiresAuth) {
      if (!authenticated) {
        // Directly accessing protected routes BEFORE authentication is determined (ie. page load)
        //   should let the authentication query handler reroute if necessary.
        // Otherwise, redirect the login page and provide a redirect back.
        return routedByApp
          ? next({ path: "/auth/login", query: { redirectUrl: to.fullPath } })
          : next();
      }

      return next();
    }

    const requiresNoAuth = to.matched.some((r) => r.meta?.requiresNoAuth);
    if (requiresNoAuth) {
      // Some routes cannot be accessed when authenticated (all matching routes must be checked)
      if (authenticated) {
        // Cancel navigation if it occurred within the app (not a refresh or manual route load).
        //   Otherwise, redirect to home (necessary to avoid invalid route state).
        return routedByApp ? next(false) : next("/");
      }

      return next();
    }

    next();
  });
};

export { applyRouterGuards };
