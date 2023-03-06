<script setup>
import ButtonLink from "./ButtonLink.vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  actionText: {
    type: String,
  },
  actionTo: {
    type: Object,
  },
});
</script>
<template>
  <div class="flex justify-between pr-2">
    <h1 class="text-3xl font-semibold mb-8">{{ text }}</h1>
    <button-link v-if="actionText" :to="actionTo">
      {{ actionText }}
    </button-link>
  </div>
</template>
