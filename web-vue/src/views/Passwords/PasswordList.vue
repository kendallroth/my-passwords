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
    <VAlert border="start" class="mb-4" type="warning" variant="tonal">
      Currently displaying items from all users!
    </VAlert>
    <VCard>
      <div v-if="passwordsQuery.isLoading.value" class="d-flex align-center justify-center">
        <VProgressCircular class="ma-10" color="primary" indeterminate :size="64" />
      </div>
      <VAlert v-else-if="passwordsQuery.isError.value" type="error">
        {{ getErrorMessage(passwordsQuery.error.value) }}
      </VAlert>
      <template v-else>
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
              <td class="table-cell--notes text-truncate" :style="{ maxWidth: '400px' }">
                {{ item.notes }}
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
    </VCard>
  </VMain>
</template>

<script setup lang="ts">
import { mdiRefresh } from "@mdi/js";
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { ActionBar } from "@components/layout";
import { useErrors } from "@composables";
import { ApiService } from "@services";
import { sleep } from "@utilities";

import type { PaginatedResult } from "@typings/pagination.types";
import type { Password } from "@typings/password.types";

const { t } = useI18n();
const { getErrorMessage } = useErrors();

interface PasswordTableColumn {
  labelKey: string;
}

const page = ref(1);
const fetchPasswords = async (): Promise<PaginatedResult<Password>> => {
  await sleep(500);
  const { data } = await ApiService.api.get("/password", {
    params: {
      page: page.value,
      sort: "name",
    },
  });
  return data as PaginatedResult<Password>;
};

const passwordsQuery = useQuery({
  keepPreviousData: true,
  queryKey: ["passwords", page],
  queryFn: fetchPasswords,
});

const tableColumns: PasswordTableColumn[] = [
  { labelKey: "name" },
  { labelKey: "collection" },
  { labelKey: "username" },
  { labelKey: "notes" },
];
</script>

<style lang="scss" scoped></style>
