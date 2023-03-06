<script setup>
import { ref } from "vue";
import { NDrawer, NDrawerContent, NMenu } from "naive-ui";
import { renderIcon, renderRouterLink } from "../utils/naive-ui";

const isOpen = ref(false);
const menuOptions = [
  {
    label: renderRouterLink({ name: "entity-models" }, "Models"),
    icon: renderIcon(["fas", "pen-ruler"]),
    key: "entity-models",
  },
];

function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}
</script>
<template>
  <fa-icon
    @click="open"
    :icon="['fas', 'bars']"
    size="xl"
    fixed-width
    class="cursor-pointer"
  />
  <n-drawer :show="isOpen" :width="240" :on-mask-click="close" placement="left">
    <n-drawer-content body-content-style="padding: 0px">
      <n-menu :options="menuOptions" :indent="10" />
    </n-drawer-content>
  </n-drawer>
</template>
