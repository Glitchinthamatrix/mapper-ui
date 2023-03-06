<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { NAlert, NTable } from "naive-ui";
import LoadingIndicator from "../../../components/LoadingIndicator.vue";
import PageTitle from "../../../components/PageTitle.vue";
import modelApis from "../../../apis/model.js";

const fetchInProgress = ref(false);
const fetchSucceeded = ref(false);
const models = ref([]);
const generalError = ref(null);

async function fetchData() {
  try {
    fetchInProgress.value = true;
    models.value = await modelApis.getModels();
    fetchSucceeded.value = true;
  } catch (e) {
    generalError.value = e.message;
  } finally {
    fetchInProgress.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>
<template>
  <page-title
    text="Models"
    actionText="Add"
    :actionTo="{ name: 'add-entity-model' }"
  />
  <loading-indicator v-if="fetchInProgress" />
  <n-alert v-if="generalError" title="Error" type="error">
    {{ generalError }}
  </n-alert>
  <n-table v-if="fetchSucceeded">
    <thead>
      <th>Name</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="model in models" :key="model.id">
        <td>{{ model.name }}</td>
        <td class="text-end">
          <router-link
            :to="{ name: 'add-entity', params: { modelId: model._id } }"
          >
            Add
          </router-link>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>
