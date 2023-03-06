<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";
import LayoutBasic from "./layouts/LayoutBasic.vue";
import LayoutHeader from "./layouts/LayoutHeader.vue";
import { useAuthStore } from "./stores/auth.js";

const auth = useAuthStore();

const themeOverrides = {
  common: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightStrong: 600,
    primaryColor: "#000000",
    primaryColorHover: "#292929",
    primaryColorPressed: "#000000",
  },
};
</script>
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <component :is="auth.isAuthenticated ? LayoutHeader : LayoutBasic">
      <router-view />
    </component>
  </n-config-provider>
</template>
