<template>
  <AuthLayout :title="t('screens.login.title')">
    <LayoutStack is="form" align-items="stretch" class="login-form" @submit.prevent="handleLogin">
      <TextField
        autofocus
        :disabled="submitting"
        :label="t('screens.login.fields.email')"
        name="email"
      />
      <TextField
        :disabled="submitting"
        :label="t('screens.login.fields.password')"
        name="password"
        password
      />
      <VBtn block color="primary" :loading="submitting" rounded="pill" size="large" type="submit">
        {{ t("screens.login.actions.login") }}
      </VBtn>
    </LayoutStack>
    <template #actions>
      <VBtn variant="text" @click="notifyNotImplemented">
        {{ t("screens.login.actions.forgotPassword") }}
      </VBtn>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import * as yup from "yup";

import { TextField } from "@components/form";
import { useErrors, useSnackbar } from "@composables";
import { AuthService } from "@services";

import { AuthLayout } from "../_components";

const { getError } = useErrors();
const { notifyError, notifyNotImplemented } = useSnackbar();
const { t } = useI18n();

const validationSchema = yup.object({
  email: yup.string().label(t("screens.login.fields.email")).email().required(),
  password: yup.string().label(t("screens.login.fields.password")).required(),
});
const {
  handleSubmit,
  isSubmitting: formSubmitting,
  setFieldError,
} = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

/**
 * Login handler resets the submission state after completion for brief moment before redirecting;
 *   however, it should continue to appear as if it were submitting until the page reloads!
 */
const hasSubmitted = ref(false);
const submitting = computed(() => formSubmitting.value || hasSubmitted.value);
const route = useRoute();

const handleLogin = handleSubmit(async (data) => {
  try {
    await AuthService.login(data);
  } catch (e: unknown) {
    setFieldError("email", "Invalid credentials");
    notifyError(getError(e, "Failed to login"));
    return;
  }

  // NOTE: Don't reset submission state before refreshing page!
  hasSubmitted.value = true;

  // Redirect to previous page (if necessary)
  const { redirectUrl = "/" } = route.query;
  // Force a page refresh to better clean up app state
  window.location.replace(redirectUrl as string);
});
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  max-width: 300px;
}
</style>
