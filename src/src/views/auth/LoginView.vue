<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { NAlert, NButton, NCard, NForm, NFormItem, NInput } from "naive-ui";
import LoadingIndicator from "../../components/LoadingIndicator.vue";
import { useAuthStore } from "../../stores/auth.js";
import validation from "../../utils/validation.js";

const router = useRouter();
const auth = useAuthStore();

const formRef = ref(null);
const form = ref({
  email: null,
  password: null,
});
const fieldErrors = ref({});
const isSubmitInProgress = ref(false);
const generalError = ref(null);
validation.initErrors(form.value, fieldErrors.value);

const rules = {
  email: [
    {
      required: true,
      message: "Email is required",
    },
    {
      type: "email",
      message: "A valid email is required",
    },
  ],
  password: {
    required: true,
    message: "Password is required",
  },
};

async function onSubmit() {
  try {
    await formRef.value.validate();
  } catch (e) {
    validation.setValidationErrors(form.value, fieldErrors.value, e);
    return;
  }

  try {
    isSubmitInProgress.value = true;
    await auth.login(form.value);
    router.push({ name: "entity-models" });
  } catch (e) {
    generalError.value = e.message;
    validation.setErrors(form.value, fieldErrors.value, e);
  } finally {
    isSubmitInProgress.value = false;
  }
}
</script>
<template>
  <div class="flex items-center h-screen">
    <div class="mx-auto w-96">
      <n-alert v-if="generalError" title="Error" type="error">
        {{ generalError }}
      </n-alert>
      <n-card class="px-2 py-4 shadow-md">
        <n-form ref="formRef" :model="form" :rules="rules" size="large">
          <n-form-item
            label="Email"
            path="email"
            :validation-status="fieldErrors.email.validationStatus"
            :feedback="fieldErrors.email.feedback"
            class="transition-margin duration-150"
            :class="{ 'mb-4': fieldErrors.email.hasError }"
          >
            <n-input v-model:value="form.email" size="large" placeholder="" />
          </n-form-item>
          <n-form-item
            label="Password"
            path="password"
            :validation-status="fieldErrors.password.validationStatus"
            :feedback="fieldErrors.password.feedback"
            class="transition-margin duration-150"
            :class="{ 'mb-4': fieldErrors.password.hasError }"
          >
            <n-input
              v-model:value="form.password"
              size="large"
              type="password"
              placeholder=""
            />
          </n-form-item>
          <div class="flex justify-end">
            <n-button @click="onSubmit" type="primary" size="large" block>
              <template v-if="isSubmitInProgress">
                <loading-indicator />
              </template>
              <template v-else> Login </template>
            </n-button>
          </div>
        </n-form>
        <div class="text-center">
          <router-link :to="{ name: 'sign-up' }">
            Do not have an account?
          </router-link>
        </div>
      </n-card>
    </div>
  </div>
</template>
