<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'

import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import Header from '@/components/layout/header/Header.vue'
</script>

<template>
  <div class="flex select-none">
    <Toaster position="bottom-right" theme="light" />
    <Header />
    <Sidebar />
    <router-view />
  </div>
</template>
