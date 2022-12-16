<template>
  <VApp>
    <TheAppDrawer />

    <TheAppBar />

    <RouterView />

    <TheAppSnackbar />
  </VApp>
</template>

<script setup lang="ts">
import { TheAppBar, TheAppDrawer, TheAppSnackbar } from "@components/single";
</script>

<style lang="scss" scoped></style>
