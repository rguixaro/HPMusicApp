<script setup lang="ts">
import type { Resource } from '@/stores/resources'
import { trimTrackName } from '@/utils/helpers'

const props = defineProps<{ item: Resource }>()
</script>

<template>
  <div class="p-2 h-16 w-72 flex border-t border-[#404040]">
    <img
      class="rounded-lg mr-3 hover:opacity-70 transition-opacity duration-150"
      :src="props.item.artworkUrl100"
    />
    <div class="flex flex-col items-start justify-center">
      <div class="flex items-center justify-center">
        <span
          class="text-sm text-white font-semibold max-w-44 max-h-5 text-ellipsis overflow-hidden"
        >
          {{ trimTrackName(props.item.collectionName) }}
        </span>
        <div
          v-if="props.item.collectionExplicitness === 'explicit'"
          class="bg-[#a8a8a8] size-3 min-w-3 ml-2 rounded-sm font-extrabold text-black text-center text-[0.5rem]"
        >
          E
        </div>
      </div>
      <span class="text-sm hover:underline max-h-5 text-ellipsis overflow-hidden">{{
        props.item.artistName
      }}</span>
    </div>
  </div>
</template>
