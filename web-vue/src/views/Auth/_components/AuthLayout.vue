<template>
  <AppPage center-vertically fluid size="small">
    <LayoutStack align-items="center" :spacing="2">
      <VCard class="pa-8 w-100">
        <LayoutStack align-items="center" :spacing="2">
          <h2 class="login__title">{{ title }}</h2>
          <slot name="default" />
        </LayoutStack>
      </VCard>
    </LayoutStack>
    <LayoutStack v-if="$slots.actions" align-items="center" class="mt-4">
      <slot name="actions" />
    </LayoutStack>
  </AppPage>
</template>

<script setup lang="ts">
import { AppPage } from "@components/layout";

type AuthLayoutProps = {
  title: string;
};

defineProps<AuthLayoutProps>();
</script>

<style lang="scss" scoped></style>
