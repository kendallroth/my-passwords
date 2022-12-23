<template>
  <VTextField
    v-bind="$attrs"
    :append-inner-icon="inputIcon"
    density="comfortable"
    :disabled="disabled"
    :error="Boolean(error)"
    :hint="error ?? hint"
    :label="label"
    :model-value="inputValue"
    persistent-hint
    :type="inputType"
    @blur="handleBlur"
    @click:append-inner="toggleHidden"
    @update:model-value="handleChange"
  />
</template>

<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { useField } from "vee-validate";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type TextFieldProps = {
  disabled?: boolean;
  hint?: string;
  label?: string;
  name: string;
  password?: boolean;
  /** Initial field value */
  value?: string;
};

const props = withDefaults(defineProps<TextFieldProps>(), {
  disabled: false,
  hint: "",
  label: undefined,
  password: false,
  value: "",
});

const hidden = ref(true);

const {
  value: inputValue,
  errorMessage: rawError,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.value,
});

const error = computed(() => {
  if (!meta.touched || !rawError.value) return;
  if (typeof rawError.value === "string") return rawError.value;

  const { key, values } = rawError.value;
  return typeof rawError.value === "string" ? rawError.value : t(key, values);
});
const inputType = computed(() => (props.password && hidden.value ? "password" : "text"));
const inputIcon = computed(() =>
  props.password ? (hidden.value ? mdiEyeOff : mdiEye) : undefined,
);

/** Toggle whether field is hidden */
const toggleHidden = () => {
  hidden.value = !hidden.value;
};
</script>
