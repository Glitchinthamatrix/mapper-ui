<!-- eslint-disable vue/valid-v-for -->
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  NAlert,
  NButton,
  NCard,
  NCheckbox,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NSpace,
} from "naive-ui";
// import { NForm } from "naive-ui";
import LoadingIndicator from "../../../components/LoadingIndicator.vue";
import PageTitle from "../../../components/PageTitle.vue";
import modelApis from "../../../apis/model.js";
import validation from "../../../utils/validation.js";
import { capitalize } from "../../../utils/string.js";

const MODEL_DATA_TYPE_STRING = "STRG";

const router = useRouter();

const fetchInProgress = ref(false);
const modelClauses = ref([]);
const modelDataTypeOptions = ref([]);
const modelRegexPatternOptions = ref([]);
const fetchSucceeded = ref(false);

// Variables for the main form
const formRef = ref(null);
const form = ref({ name: null, defaultRelationships: [] });
const rules = {
  name: {
    required: true,
    message: "Name is required",
  },
};
const fieldErrors = ref({});
const isSubmitInProgress = ref(false);
validation.initErrors(form.value, fieldErrors.value);
const generalError = ref(null);

// Variables for the new field form
const newFieldFormRef = ref(null);
const newFieldForm = ref({ name: null });
const newFieldRules = {
  name: { required: true, message: "Property name is required" },
};
const newFieldFieldErrors = ref({});
validation.initErrors(newFieldForm.value, newFieldFieldErrors.value);

async function getData() {
  try {
    fetchInProgress.value = true;
    modelClauses.value = await modelApis.getClauses();
    const types = await modelApis.getDataTypes();
    const patterns = await modelApis.getRegexPatterns();
    modelDataTypeOptions.value = Object.keys(types).map((key) => ({
      label: key,
      value: types[key],
    }));
    modelRegexPatternOptions.value = Object.keys(patterns).map((key) => ({
      label: key,
      value: patterns[key],
    }));
    fetchSucceeded.value = true;
  } catch (e) {
    generalError.value = e.message;
  } finally {
    fetchInProgress.value = false;
  }
}

async function onAddPropertyClick() {
  try {
    await newFieldFormRef.value.validate();
  } catch (e) {
    validation.setValidationErrors(
      newFieldForm.value,
      newFieldFieldErrors.value,
      e
    );
    return;
  }
  if (form.value.properties === undefined) {
    form.value.properties = {};
    rules.properties = {};
  }
  form.value.properties[newFieldForm.value.name] = {
    type: null,
    required: true,
    unique: false,
  };
  rules.properties[newFieldForm.value.name] = {
    type: { required: true, message: "Type is required" },
  };
  validation.initErrors(form.value, fieldErrors.value);
  newFieldForm.value.name = null;
}

function addPaternClause(key) {
  form.value.properties[key].pattern = null;
}

function removePatternClause(key) {
  delete form.value.properties[key].pattern;
}

function removeProperty(key) {
  delete form.value.properties[key];
}

async function onSave() {
  try {
    await formRef.value.validate();
  } catch (e) {
    validation.setValidationErrors(form.value, fieldErrors.value, e);
    return;
  }

  try {
    isSubmitInProgress.value = true;
    await modelApis.addModel(form.value);
    goToModels();
  } catch (e) {
    validation.setErrors(form.value, fieldErrors.value, e);
    generalError.value = e.message;
  } finally {
    isSubmitInProgress.value = false;
  }
}

function onCancel() {
  goToModels();
}

function goToModels() {
  router.push({ name: "entity-models" });
}

onMounted(() => {
  getData();
});
</script>
<template>
  <page-title text="Add Model" />
  <n-alert v-if="generalError" title="Error" type="error">
    {{ generalError }}
  </n-alert>
  <loading-indicator v-if="fetchInProgress" size="xl" />
  <n-card>
    <n-form ref="formRef" :model="form" :rules="rules" size="large">
      <n-form-item
        label="Name"
        path="name"
        :validation-status="fieldErrors.name.validationStatus"
        :feedback="fieldErrors.name.feedback"
        class="transition-margin duration-150"
        :class="{ 'mb-4': fieldErrors.name.hasError }"
      >
        <n-input v-model:value="form.name" placeholder="" />
      </n-form-item>
      <n-form-item
        v-for="(value, key) in form.properties"
        :key="key"
        :label="capitalize(key)"
        label-style="font-weight: 550"
      >
        <div class="grid grid-cols-12 w-full pl-4">
          <div class="col-span-3 pr-5">
            <n-form-item
              label="Type"
              :path="`properties.${key}.type`"
              :validation-status="
                fieldErrors.properties[key].type.validationStatus
              "
              :feedback="fieldErrors.properties[key].type.feedback"
              class="transition-margin duration-150"
              :class="{ 'mb-4': fieldErrors.properties[key].type.hasError }"
            >
              <n-select
                :options="modelDataTypeOptions"
                v-model:value="form.properties[key].type"
                placeholder=""
              />
            </n-form-item>
          </div>
          <div class="col-span-2">
            <n-form-item label="Is required?">
              <n-checkbox v-model:checked="form.properties[key].required">
                Yes
              </n-checkbox>
            </n-form-item>
          </div>
          <div class="col-span-2">
            <n-form-item label="Must be unique?">
              <n-checkbox v-model:checked="form.properties[key].unique">
                Yes
              </n-checkbox>
            </n-form-item>
          </div>
          <div
            v-if="form.properties[key].type === MODEL_DATA_TYPE_STRING"
            class="col-span-2 flex items-center"
          >
            <n-form-item
              :label="
                form.properties[key].pattern === undefined
                  ? ''
                  : 'Select Pattern'
              "
              class="w-full"
            >
              <n-button
                v-if="form.properties[key].pattern === undefined"
                @click="addPaternClause(key)"
              >
                Add pattern
              </n-button>
              <template v-else>
                <n-select
                  :options="modelRegexPatternOptions"
                  v-model:value="form.properties[key].pattern"
                  placeholder=""
                />
                <div class="ml-2">
                  <n-button @click="removePatternClause(key)">
                    <fa-icon :icon="['fas', 'xmark']" />
                  </n-button>
                </div>
              </template>
            </n-form-item>
          </div>
          <div class="col-span-3 flex justify-end">
            <n-form-item>
              <n-button @click="removeProperty(key)">
                <fa-icon :icon="['fas', 'trash']" />
              </n-button>
            </n-form-item>
          </div>
        </div>
      </n-form-item>
    </n-form>
    <n-card>
      <n-form
        ref="newFieldFormRef"
        :model="newFieldForm"
        :rules="newFieldRules"
        inline
      >
        <n-form-item
          label="Property Name"
          path="name"
          :validation-status="newFieldFieldErrors.name.validationStatus"
          :feedback="newFieldFieldErrors.name.feedback"
          class="transition-margin duration-150"
          :class="{ 'mb-4': newFieldFieldErrors.name.hasError }"
        >
          <n-input v-model:value="newFieldForm.name" placeholder="" />
        </n-form-item>
        <n-form-item>
          <n-button @click="onAddPropertyClick" type="primary">
            Add Property
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
    <div class="mt-3">
      <n-space>
        <n-button @click="onSave" type="primary" size="large">
          <loading-indicator v-if="isSubmitInProgress" />
          <template v-else> Save </template>
        </n-button>
        <n-button @click="onCancel" size="large">Cancel</n-button>
      </n-space>
    </div>
  </n-card>
</template>
