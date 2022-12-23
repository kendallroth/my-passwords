<template>
  <VApp>
    <template v-if="!loadingAuth">
      <TheAppDrawer v-if="accountStore.authenticated" />
      <TheAppBar />
      <RouterView />
    </template>
    <template v-else>
      <div class="app__loader">
        <VProgressCircular color="primary" indeterminate size="80" />
      </div>
    </template>
    <TheAppSnackbar />
  </VApp>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { TheAppBar, TheAppDrawer, TheAppSnackbar } from "@components/single";
import { useSnackbar } from "@composables";
import { AuthService } from "@services";
import { useAccountStore } from "@stores";
import { sleep } from "@utilities";

const router = useRouter();
const route = useRoute();
const { notifyError } = useSnackbar();
const accountStore = useAccountStore();

/**
 * Whether authentication is loading
 *
 * NOTE: Must start 'true' to avoid double mounting components!
 */
const loadingAuth = ref(true);

onMounted(async () => {
  await fetchAccount();
});

const fetchAccount = async () => {
  loadingAuth.value = true;

  // Briefly pause before loading authenticated account to allow Vue Router to initialize
  //   current route before route prevention check happens!
  await sleep(10);

  if (!AuthService.hasAuthTokens()) {
    await preventInvalidRouteAccess();
    loadingAuth.value = false;
    return;
  }

  try {
    await AuthService.fetchAccount();
  } catch (e: unknown) {
    AuthService.removeAuthTokens();
    await preventInvalidRouteAccess();
    return;
  } finally {
    loadingAuth.value = false;
  }

  // Redirect away from unauthenticated pages when authenticated
  const { meta } = route;
  if (meta && meta.requiresNoAuth) {
    router.replace("/");
  }
};

/**
 * Protect authorized routes if user authentication fails
 *
 * NOTE: Be sure to await function to properly handle brief delay to allow redirections to process
 *         before allowing any child routes to render!
 */
const preventInvalidRouteAccess = async () => {
  const { fullPath, matched } = route;
  const requiresAuth = matched?.some((m) => m.meta?.requiresAuth);
  if (requiresAuth) {
    router.replace({
      path: "/auth/login",
      query: { redirectUrl: fullPath },
    });
    notifyError("Account is not authenticated");
  }

  // Briefly pause before "completing" auth check to allow redirection to occur before mounting!
  await sleep(10);
};
</script>

<style lang="scss" scoped>
.app__loader {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}
</style>
