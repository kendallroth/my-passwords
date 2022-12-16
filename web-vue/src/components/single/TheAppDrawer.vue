<template>
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
        :title="t('common.appDrawer.menuItems.collapse')"
        @click.stop="drawerRailMode = !drawerRailMode"
      />
    </VList>
    <VDivider />
    <VList nav>
      <VListItem
        v-for="item in drawerMenuItems"
        :key="item.labelKey"
        :prepend-icon="item.icon"
        :title="t(`common.appDrawer.menuItems.${item.labelKey}`)"
        :to="item.link"
        @click.stop
      />
    </VList>
    <template #append>
      <VList nav>
        <VListItem
          :prepend-icon="mdiSettings"
          :title="t('common.appDrawer.menuItems.settings')"
          @click.stop="notifyNotImplemented"
        />
      </VList>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiFolderOpen as mdiCollection,
  mdiFormTextboxPassword as mdiPassword,
  mdiCog as mdiSettings,
} from "@mdi/js";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { useSnackbar } from "@composables";

const drawerRailMode = ref(false);

interface DrawerMenuItem {
  icon: string;
  labelKey: string;
  link?: string;
}

const drawerMenuItems: DrawerMenuItem[] = [
  { icon: mdiPassword, labelKey: "passwords", link: "/passwords" },
  { icon: mdiCollection, labelKey: "collections", link: "/collections" },
];

const { t } = useI18n();
const { notifyNotImplemented } = useSnackbar();
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
</style>
