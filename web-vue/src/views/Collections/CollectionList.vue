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
    <VCard>
      <div v-if="collectionsQuery.isLoading.value" class="d-flex align-center justify-center">
        <VProgressCircular class="ma-10" color="primary" indeterminate :size="64" />
      </div>
      <VAlert v-else-if="collectionsQuery.isError.value" type="error">
        {{ getErrorMessage(collectionsQuery.error.value) }}
      </VAlert>
      <template v-else>
        <VList v-if="collections?.length" :disabled="collectionsQuery.isFetching.value">
          <VListItem
            v-for="item in collections"
            :key="item.id"
            :title="item.name"
            @click="notifyNotImplemented"
          >
            <template v-if="item.passwords" #append>
              <VChip :append-icon="mdiPassword" class="pr-4" color="info">
                {{ item.passwords }}
              </VChip>
            </template>
          </VListItem>
        </VList>
        <VAlert v-else class="ma-8" type="info" variant="tonal">
          {{ t("common.errors.noItems") }}
        </VAlert>
      </template>
    </VCard>
  </VMain>
</template>

<script setup lang="ts">
import { mdiFormTextboxPassword as mdiPassword, mdiRefresh } from "@mdi/js";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { ActionBar } from "@components/layout";
import { useErrors, useSnackbar } from "@composables";
import { ApiService } from "@services";

import type { Collection } from "@typings/collection.types";
import type { PaginatedResult } from "@typings/pagination.types";

const { t } = useI18n();
const { notifyNotImplemented } = useSnackbar();
const { getErrorMessage } = useErrors();

const fetchCollections = async (): Promise<PaginatedResult<Collection>> => {
  const { data } = await ApiService.api.get("/collection", { params: { sort: "name", size: 100 } });
  return data as PaginatedResult<Collection>;
};

const collectionsQuery = useQuery({
  queryKey: ["collections"],
  queryFn: fetchCollections,
  select: (paginated) => paginated.data,
});

const collections = computed(() => collectionsQuery.data.value ?? []);
</script>

<style lang="scss" scoped></style>
