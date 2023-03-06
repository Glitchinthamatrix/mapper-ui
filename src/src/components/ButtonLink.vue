<script setup>
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  to: {
    type: Object,
    required: true,
  },
});
const router = useRouter();

function onClick() {
  router.push(props.to);
}
</script>
<template>
  <n-button @click="onClick" :type="type" size="large"><slot /></n-button>
</template>
