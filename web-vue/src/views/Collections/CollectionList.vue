<template>
  <VMain class="ma-5">
    <ActionBar>
      <template #left>
        <div class="text-h4 mb-4">{{ t("screens.collectionList.title") }}</div>
      </template>
      <template #right>
        <VBtn :icon="mdiRefresh" variant="text" @click="collectionsQuery.refetch" />
      </template>
    </ActionBar>
    <VAlert border="start" class="mb-4" type="warning" variant="tonal">
      Currently displaying items from all users!
    </VAlert>
    <VCard>
      <div v-if="collectionsQuery.isLoading.value" class="d-flex align-center justify-center">
        <VProgressCircular class="ma-10" color="primary" indeterminate :size="64" />
      </div>
      <VAlert v-else-if="collectionsQuery.isError.value" type="error">
        {{ getErrorMessage(collectionsQuery.error.value) }}
      </VAlert>
      <template v-else>
        <VList :disabled="collectionsQuery.isFetching.value">
          <VListItem
            v-for="item in collectionsQuery.data.value"
            :key="item.id"
            :title="item.name"
            @click="notifyNotImplemented"
          />
        </VList>
      </template>
    </VCard>
  </VMain>
</template>

<script setup lang="ts">
import { mdiRefresh } from "@mdi/js";
import { useQuery } from "@tanstack/vue-query";
import { useI18n } from "vue-i18n";

import { ActionBar } from "@components/layout";
import { useErrors, useSnackbar } from "@composables";
import { ApiService } from "@services";
import { sleep } from "@utilities";

import type { Collection } from "@typings/collection.types";

const { t } = useI18n();
const { notifyNotImplemented } = useSnackbar();
const { getErrorMessage } = useErrors();

const fetchCollections = async (): Promise<Collection[]> => {
  await sleep(500);
  const { data } = await ApiService.api.get("/collections");
  return data as Collection[];
};

const collectionsQuery = useQuery({
  queryKey: ["collections"],
  queryFn: fetchCollections,
});
</script>

<style lang="scss" scoped></style>
