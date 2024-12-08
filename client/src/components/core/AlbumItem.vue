<script setup lang="ts">
import type { Resource } from '@/stores/resources'

const props = defineProps<{ item: Resource }>()
</script>

<template>
  <div class="flex flex-col px-5 w-40">
    <img
      class="rounded-md w-40 mb-0.5 hover:opacity-70 transition-opacity duration-150"
      :src="props.item.artworkUrl100"
    />
    <div class="flex items-start justify-between">
      <span class="text-sm text-white font-semibold max-h-10 text-ellipsis overflow-hidden">
        {{ props.item.collectionName }}
      </span>
      <div
        v-if="props.item.collectionExplicitness === 'explicit'"
        class="bg-[#a8a8a8] size-3 min-w-3 ml-2 mt-1 rounded-sm font-extrabold text-black text-center text-[0.5rem]"
      >
        E
      </div>
    </div>
    <span class="text-sm hover:underline max-h-10 truncate">{{ props.item.artistName }}</span>
  </div>
</template>
