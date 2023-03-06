<script setup>
defineProps({
  size: {
    type: String,
    default: "lg",
  },
});
</script>
<template>
  <div class="w-full text-center">
    <fa-icon :icon="['fas', 'spinner']" :size="size" spin />
  </div>
</template>
