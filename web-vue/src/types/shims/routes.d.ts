import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /** Whether route requires authentication */
    requiresAuth?: boolean;
    /** Whether route requires no authentication (inaccessible if authenticated) */
    requiresNoAuth?: boolean;
  }
}

export {};
