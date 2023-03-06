<script setup>
import { useRouter } from "vue-router";
import { NDropdown } from "naive-ui";
import SideNav from "./SideNav.vue";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const auth = useAuthStore();

const dropdownOptions = [
  {
    label: "Logout",
    key: "logout",
  },
];

async function onSelect(key) {
  try {
    if (key === "logout") {
      await auth.logout();
      router.push({ name: "login" });
    }
  } catch (e) {
    //
  }
}
</script>
<template>
  <div class="flex justify-between items-center px-2 py-1">
    <side-nav />
    <n-dropdown @select="onSelect" :options="dropdownOptions" trigger="click">
      <div class="cursor-pointer">
        <fa-icon :icon="['far', 'user-circle']" size="2x" fixed-width />
      </div>
    </n-dropdown>
  </div>
</template>
