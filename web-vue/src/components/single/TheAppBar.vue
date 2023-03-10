<template>
  <VAppBar class="app-bar" color="primary">
    <!-- <v-app-bar-nav-icon @click="drawerRailMode = !drawerRailMode" /> -->
    <VIcon class="ml-4" color="white" :icon="mdiShield" />
    <VToolbarTitle>{{ t("common.app.title") }}</VToolbarTitle>
    <template v-if="accountStore.authenticated">
      <VFadeTransition>
        <VTextField
          v-if="appSearch.shown"
          class="app-bar__search"
          clearable
          density="comfortable"
          hide-details
          :model-value="appSearch.text"
          :placeholder="t('common.appBar.search')"
          :prepend-inner-icon="mdiSearch"
          variant="solo"
          @click:clear="appSearch.clear"
          @update:model-value="appSearch.change"
        />
      </VFadeTransition>
    </template>
    <VSpacer />
    <VIcon
      v-visible="fetchingData"
      class="mr-4 app-bar__fetching"
      color="deep-purple-lighten-4"
      :icon="mdiNetwork"
    />
    <VMenu :offset="4">
      <template #activator="{ props }">
        <VBtn class="mr-2" icon v-bind="props">
          <VAvatar
            class="app-bar__language-avatar"
            :image="currentLanguage.flag"
            :rounded="0"
            size="24"
          />
        </VBtn>
      </template>
      <VList :min-width="150">
        <VListItem
          v-for="language in languageList"
          :key="language.code"
          :active="language.code === currentLanguage.code"
          :title="language.title"
          @click="setAppLocale(language.code)"
        >
          <template #prepend>
            <VAvatar
              class="app-bar__language-avatar is-light"
              :image="language.flag"
              :rounded="0"
              size="24"
            />
          </template>
        </VListItem>
      </VList>
    </VMenu>
    <template v-if="accountStore.authenticated">
      <VMenu :offset="4">
        <template #activator="{ props }">
          <VBtn :icon="mdiAccount" v-bind="props" />
        </template>
        <VList :min-width="200">
          <VListItem @click="logoutDialog.show()">
            {{ t("common.appBar.menuItems.logOut") }}
          </VListItem>
        </VList>
      </VMenu>
      <ConfirmDialog
        :model-value="logoutDialog.open.value"
        :title="t('common.appBar.dialogs.logout.title')"
        @cancel="logoutDialog.hide"
        @confirm="handleLogout"
      >
        {{ t("common.appBar.dialogs.logout.content") }}
      </ConfirmDialog>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
import flagES from "@localization/icons/flag-es.png";
import flagUS from "@localization/icons/flag-us.png";
import { mdiAccount, mdiWifi as mdiNetwork, mdiMagnify as mdiSearch, mdiShield } from "@mdi/js";
import { useIsFetching } from "@tanstack/vue-query";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { useAppSearch, useDialog } from "@composables";
import { setAppLocale } from "@localization";
import { AuthService } from "@services";
import { useAccountStore } from "@stores";

import type { Languages } from "@localization";

const appSearch = reactive(useAppSearch());
const accountStore = useAccountStore();

const { t, ...i18n } = useI18n();
interface LanguageOption {
  code: Languages;
  flag: string;
  title: string;
}
const languages: Record<Languages, LanguageOption> = {
  en: {
    code: "en",
    flag: flagUS,
    title: "English",
  },
  es: {
    code: "es",
    flag: flagES,
    title: "Espa??ol",
  },
};
const languageList = Object.values(languages);
const currentLanguage = computed(
  () => languages[i18n.locale.value as Languages] ?? languages["en"],
);

// Used to display an indicator when any app data is fetching
const fetchingData = useIsFetching();

const logoutDialog = useDialog();
const router = useRouter();

const handleLogout = () => {
  logoutDialog.hide();
  router.push("/auth/logout");
};
</script>

<style lang="scss" scoped>
.app-bar {
  :deep(.v-toolbar-title) {
    flex: 0;
    min-width: unset;
    margin-right: 48px;
  }

  .app-bar__search {
    max-width: 500px;
  }
}

// NOTE: Cannot be inside '.app-bar' as menu items are mounted outside in DOM!
.app-bar__language-avatar {
  --border-color: white;

  &.is-light {
    // --border-color: rgb(var(--v-theme-primary));
    --border-color: grey;
  }

  :deep(.v-img) {
    border: 2px solid var(--border-color);
    border-radius: 4px;
    height: fit-content !important;
  }
}
</style>
