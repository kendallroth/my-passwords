<template>
  <AuthLayout :title="t('screens.logout.title')">
    <LayoutStack align-items="center">
      <VProgressCircular class="mt-4" color="primary" indeterminate size="50" />
      <h4 class="logout-message">{{ t("screens.logout.content") }}&hellip;</h4>
    </LayoutStack>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

import { AuthService } from "@services";

import { AuthLayout } from "../_components";

const { t } = useI18n();

onMounted(async () => {
  await AuthService.logout();

  setTimeout(async () => {
    // Use a hard page reload to ensure app state is cleaned properly
    window.location.replace("/auth/login");
  }, 1000);
});
</script>

<style lang="scss" scoped>
.logout-message {
  font-size: 1.25rem;
}
</style>
