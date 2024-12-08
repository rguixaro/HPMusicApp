<script setup lang="ts">
import { RouterView } from 'vue-router'

import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Header from '@/components/layout/header/Header.vue'
</script>

<template>
  <div class="flex select-none">
    <Header />
    <Sidebar />
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'atkinson';
  src: url('./assets/fonts/atkinson-regular.woff');
}
@font-face {
  font-family: 'atkinson-bold';
  src: url('./assets/fonts/atkinson-bold.woff');
}
</style>
