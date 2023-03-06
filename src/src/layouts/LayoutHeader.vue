<script setup>
import { NLayout, NLayoutContent, NLayoutHeader } from "naive-ui";
import PageHeader from "../components/PageHeader.vue";
</script>
<template>
  <n-layout>
    <n-layout-header class="pb-1">
      <page-header />
    </n-layout-header>
    <n-layout-content class="px-2 text-base text-black font-base">
      <slot />
    </n-layout-content>
  </n-layout>
</template>
