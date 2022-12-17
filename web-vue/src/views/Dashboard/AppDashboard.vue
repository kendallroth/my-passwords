<template>
  <VMain class="ma-5">
    <ActionBar>
      <template #left>
        <div class="text-h4 mb-4">{{ t("screens.dashboard.title") }}</div>
      </template>
    </ActionBar>
    <VAlert border="start" class="mb-4" type="warning" variant="tonal">
      {{ t("common.errors.notImplemented") }}
    </VAlert>
  </VMain>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { ActionBar } from "@components/layout";

const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
