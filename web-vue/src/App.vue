<template>
  <VApp>
    <VNavigationDrawer
      class="app-drawer"
      color="blue-grey-darken-3"
      permanent
      :rail="drawerRailMode"
      @click="drawerRailMode = false"
    >
      <VList nav>
        <VListItem
          :prepend-icon="drawerRailMode ? mdiChevronRight : mdiChevronLeft"
          title="Collapse"
          @click.stop="drawerRailMode = !drawerRailMode"
        />
      </VList>
      <VDivider />
      <VList nav>
        <VListItem
          v-for="item in drawerMenuItems"
          :key="item.label"
          :prepend-icon="item.icon"
          :title="item.label"
          :value="item.value"
        />
      </VList>
      <template #append>
        <VList nav>
          <VListItem :prepend-icon="mdiSettings" title="Settings" @click="notifyNotImplemented" />
        </VList>
      </template>
    </VNavigationDrawer>

    <VAppBar class="app-bar" color="primary">
      <!-- <v-app-bar-nav-icon @click="drawerRailMode = !drawerRailMode" /> -->
      <VIcon class="ml-4" color="white" :icon="mdiShield" />
      <VToolbarTitle>{{ t("common.app.title") }}</VToolbarTitle>
      <VTextField
        class="app-bar__search"
        clearable
        density="comfortable"
        hide-details
        placeholder="Search"
        :prepend-inner-icon="mdiSearch"
        variant="solo"
      />
      <VSpacer />
      <VMenu :offset="4">
        <template #activator="{ props }">
          <VBtn :icon="mdiAccount" variant="tonal" v-bind="props" />
        </template>
        <VList :min-width="200">
          <VListItem @click="notifyNotImplemented">Log Out</VListItem>
        </VList>
      </VMenu>
    </VAppBar>

    <VMain class="ma-5">
      <ActionBar>
        <template #left>
          <div class="text-h4 mb-4">Collections</div>
        </template>
        <template #right>
          <VBtn :icon="mdiRefresh" variant="text" @click="collectionsQuery.refetch" />
        </template>
      </ActionBar>
      <VCard>
        <div
          v-if="collectionsQuery.isInitialLoading.value || collectionsQuery.isRefetching.value"
          class="d-flex align-center justify-center"
        >
          <VProgressCircular class="ma-10" color="primary" indeterminate :size="64" />
        </div>
        <VAlert v-else-if="collectionsQuery.isError.value" type="error">
          {{ getErrorMessage(collectionsQuery.error.value) }}
        </VAlert>
        <VList v-else-if="collectionsQuery.isFetched.value">
          <VListItem
            v-for="item in collectionsQuery.data.value"
            :key="item.id"
            :title="item.name"
            @click="notifyNotImplemented"
          />
        </VList>
      </VCard>
    </VMain>
    <TheAppSnackbar />
  </VApp>
</template>

<script setup lang="ts">
import {
  mdiAccount,
  mdiChevronLeft,
  mdiChevronRight,
  mdiFolder as mdiCollection,
  mdiLock as mdiPassword,
  mdiRefresh,
  mdiMagnify as mdiSearch,
  mdiCog as mdiSettings,
  mdiShield,
} from "@mdi/js";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { ActionBar } from "@components/layout";
import { TheAppSnackbar } from "@components/single";
import { useErrors, useSnackbar } from "@composables";
import webConfig from "@config";
import { sleep } from "@utilities";

const drawerRailMode = ref(false);

interface DrawerMenuItem {
  icon: string;
  label: string;
  value: string;
}

const drawerMenuItems: DrawerMenuItem[] = [
  { icon: mdiPassword, label: "Passwords", value: "passwords" },
  { icon: mdiCollection, label: "Collections", value: "collections" },
];

const { t } = useI18n();
const { notifyNotImplemented } = useSnackbar();
const { getErrorMessage } = useErrors();

const axiosClient = axios.create({
  baseURL: webConfig.apiUrl,
  auth: {
    password: "Passw0rd!",
    username: "admin",
  },
});
const queryClient = useQueryClient();

interface Collection {
  id: string;
  createdAt: string;
  icon: string | null;
  name: string;
}

const fetchCollections = async (): Promise<Collection[]> => {
  await sleep(500);
  const { data } = await axiosClient.get("/collections");
  return data as Collection[];
};

const collectionsQuery = useQuery({ queryKey: ["collections"], queryFn: fetchCollections });
</script>

<style lang="scss" scoped>
.app-drawer {
  :global(.v-navigation-drawer__content) {
    display: flex;
    flex-direction: column;
  }

  :global(.v-list-item-title) {
    font-size: 0.9rem !important;
    font-weight: 500 !important;
  }
}

.app-bar {
  :global(.v-toolbar-title) {
    flex: 0;
    min-width: unset;
    margin-right: 48px;
  }

  .app-bar__search {
    max-width: 500px;
  }
}
</style>
