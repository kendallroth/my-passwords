<template>
  <VMain :class="backgroundClass">
    <VContainer class="page-layout__container" :class="{ 'pa-0': !padding }" :fluid="fluid">
      <VRow :align="centerVertically ? 'center' : 'start'" class="page-layout__row" no-gutters>
        <VCol v-bind="columnProps">
          <slot />
        </VCol>
      </VRow>
    </VContainer>
  </VMain>
</template>

<script lang="ts" setup>
import { computed } from "vue";

type ColumnSize = {
  cols: number;
  sm?: number;
  "offset-sm"?: number;
  md?: number;
  "offset-md"?: number;
  lg?: number;
  "offset-lg"?: number;
  xl?: number;
  "offset-xl"?: number;
};

type AppPageProps = {
  /** Background class (useful for page backgrounds, etc) */
  backgroundClass?: string;
  /** Whether content is vertically centered on page */
  centerVertically?: boolean;
  /** Additional customization for column sizes */
  columns?: Partial<ColumnSize>;
  /** Whether container should be fluid (fullscreen) */
  fluid?: boolean;
  /** Whether default columns are ignored (overrides size) */
  ignoreColumns?: boolean;
  /** Whether container provides padding */
  padding?: boolean;
  /** Container size preset */
  size?: string;
};

const props = withDefaults(defineProps<AppPageProps>(), {
  backgroundClass: "",
  center: false,
  columns: () => ({}),
  fluid: false,
  ignoreColumns: false,
  padding: true,
  size: "large",
});

const columnProps = computed(() => {
  const { columns, ignoreColumns, size } = props;

  if (ignoreColumns) {
    return { cols: 12, offset: 0 };
  }

  let defaultColumns: ColumnSize = {
    cols: 12,
  };

  if (size === "small") {
    defaultColumns = {
      ...defaultColumns,
      sm: 6,
      "offset-sm": 3,
      xl: 4,
      "offset-xl": 4,
    };
  } else if (size === "medium") {
    defaultColumns = {
      ...defaultColumns,
      sm: 10,
      "offset-sm": 1,
      xl: 8,
      "offset-xl": 2,
    };
  } else if (size == "large") {
    defaultColumns = {
      ...defaultColumns,
      sm: 12,
      xl: 10,
      "offset-xl": 1,
    };
  }

  const overrideColumns = columns;
  const mergedColumns = {
    ...defaultColumns,
    ...overrideColumns,
  };

  return mergedColumns;
});
</script>

<style lang="scss" scoped>
.page-layout__container {
  height: 100%;
}

.page-layout__row {
  height: 100%;
}
</style>
