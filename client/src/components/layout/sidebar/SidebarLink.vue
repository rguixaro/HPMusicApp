<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, Squares2X2Icon, SignalIcon } from '@heroicons/vue/24/solid'

import { cn } from '@/utils/cn'

/**
 * Sidebar links
 */
const Links: {
  [key: string]: {
    name: string
    icon: any
  }
} = {
  '/': { name: 'Home', icon: HomeIcon },
  '/new': { name: 'New', icon: Squares2X2Icon },
  '/radio': { name: 'Radio', icon: SignalIcon },
}

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive, cn, Links }
  },
}
</script>

<template>
  <router-link :to="to" class="focus:outline-none">
    <div
      :class="
        cn('flex my-2 px-2 py-1.5 rounded-lg group', `${isActive ? 'bg-[#3a3a3b]' : 'bg-none'}`)
      "
    >
      <component :is="Links[to].icon" class="size-6 mr-2 text-accent" />
      <h3 :class="cn('pt-0.5', isActive ? 'font-bold' : 'font-medium')">
        {{ Links[to].name }}
      </h3>
      <transition name="fade">
        <slot />
      </transition>
    </div>
  </router-link>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
