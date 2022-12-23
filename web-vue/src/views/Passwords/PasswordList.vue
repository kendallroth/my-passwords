<template>
  <VMain class="ma-5">
    <ActionBar>
      <template #left>
        <div class="text-h4 mb-4">{{ t("screens.passwordList.title") }}</div>
      </template>
      <template #right>
        <VBtn :icon="mdiRefresh" variant="text" @click="passwordsQuery.refetch" />
      </template>
    </ActionBar>
    <VCard>
      <div v-if="passwordsQuery.isLoading.value" class="d-flex align-center justify-center">
        <VProgressCircular class="ma-10" color="primary" indeterminate :size="64" />
      </div>
      <VAlert v-else-if="passwordsQuery.isError.value" type="error">
        {{ getErrorMessage(passwordsQuery.error.value) }}
      </VAlert>
      <template v-else-if="passwordsQuery.data.value?.data.length">
        <VTable>
          <thead>
            <tr>
              <th v-for="column in tableColumns" :key="column.labelKey">
                {{ t(`screens.passwordList.table.columns.${column.labelKey}`) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in passwordsQuery.data.value?.data" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.collection?.name ?? "N/A" }}</td>
              <td>{{ item.username }}</td>
              <td :style="{ color: item.stats.color }">
                <VRating
                  density="compact"
                  :empty-icon="mdiCircleOutline"
                  :full-icon="mdiCircle"
                  length="5"
                  :model-value="item.stats.score"
                  readonly
                  size="small"
                />
              </td>
              <td>
                <LayoutStack align-items="center" direction="row" :spacing="0">
                  {{ dayjs(item.createdAt).fromNow() }}
                  <VIcon v-if="dayjs().diff(item.createdAt, 'day') > 365" color="warning">
                    {{ mdiWarning }}
                  </VIcon>
                </LayoutStack>
              </td>
            </tr>
          </tbody>
        </VTable>
        <VPagination
          density="comfortable"
          :disabled="passwordsQuery.isFetching.value"
          :length="passwordsQuery.data.value?.pagination.totalPages"
          :model-value="passwordsQuery.data.value?.pagination.page"
          total-visible="5"
          @update:model-value="(value) => (page = value)"
        />
      </template>
      <VAlert v-else class="ma-8" type="info" variant="tonal">
        {{ t("common.errors.noItems") }}
      </VAlert>
    </VCard>
  </VMain>
</template>

<script setup lang="ts">
import {
  mdiCircle,
  mdiCircleOutline,
  mdiRefresh,
  mdiExclamationThick as mdiWarning,
} from "@mdi/js";
import { useQuery } from "@tanstack/vue-query";
import { useDebounce } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { ActionBar } from "@components/layout";
import { useAppSearch, useErrors } from "@composables";
import { ApiService } from "@services";

import type { PaginatedResult } from "@typings/pagination.types";
import type { Password } from "@typings/password.types";

const { t } = useI18n();
const { getErrorMessage } = useErrors();

interface PasswordTableColumn {
  labelKey: string;
}

const appSearch = reactive(
  useAppSearch({
    mountAction: "show",
    unmountAction: "hide",
  }),
);

const page = ref(1);
const fetchPasswords = async (): Promise<PaginatedResult<Password>> => {
  const { data } = await ApiService.api.get("/password", {
    params: {
      name: appSearch.text,
      page: page.value,
      sort: "name",
    },
  });
  return data as PaginatedResult<Password>;
};

const debouncedSearch = useDebounce(
  computed(() => appSearch.text),
  250,
  { maxWait: 500 },
);
const passwordsQuery = useQuery({
  keepPreviousData: true,
  queryKey: ["passwords", page, debouncedSearch],
  queryFn: fetchPasswords,
});

const tableColumns: PasswordTableColumn[] = [
  { labelKey: "name" },
  { labelKey: "collection" },
  { labelKey: "username" },
  { labelKey: "strength" },
  { labelKey: "age" },
];
</script>

<style lang="scss" scoped></style>
