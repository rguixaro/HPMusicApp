<script setup lang="ts">
import { ref, reactive } from 'vue'
import debounce from 'lodash.debounce'

import { cn } from '@/utils/cn'

const emit = defineEmits(['change'])

const props = defineProps<{ type: 'album' | 'single' | 'ep' }>()
const form = reactive({ query: '' })

type visibility = 'visible' | 'hidden' | 'outlined'

/**
 * Placeholders for the search input
 */
const PLACEHOLDERS = {
  album: 'Search album',
  single: 'Search single',
  ep: 'Search ep',
}

const status = ref<visibility>('hidden')
const inputRef = ref<HTMLInputElement | null>(null)

/**
 * Change the status of the search input
 */
const changeStatus = debounce(() => {
  if (status.value === 'visible') status.value = form.query != '' ? 'outlined' : 'hidden'
  else if (status.value === 'outlined' && form.query) status.value = 'hidden'
  else {
    status.value = 'visible'
    inputRef.value?.focus()
  }
}, 100)

/**
 * Debounce the change event
 */
const onchange = debounce(() => {
  emit('change', { type: props.type, query: form.query })
}, 300)
</script>

<template>
  <div class="w-full my-5 mx-3 flex">
    <button
      :class="
        cn(
          'relative left-0 flex items-center z-40',
          'transition-opacity duration-300',
          status === 'outlined' ? '' : 'opacity-100',
        )
      "
      @click="changeStatus"
    >
      <svg
        :class="cn('w-4 h-4', status === 'hidden' ? 'text-accent' : 'text-neutral-400')"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </button>
    <input
      type="search"
      ref="inputRef"
      v-model="form.query"
      v-on:blur="changeStatus"
      @input="onchange"
      id="default-search"
      :class="
        cn(
          'relative block w-0 py-1.5 right-7 px-3 ps-10 text-sm z-10 bg-[#1f1f1f] text-neutral-400 placeholder-neutral-500 border-[1px]',
          'transition-all duration-500 border-l-[5px] border-[#404040] rounded-[5px] focus:outline-none',
          'focus:ring-1 focus:ring-accent',
          status === 'visible'
            ? 'w-44 pointer-events-auto'
            : status === 'outlined'
              ? 'w-44 focus:ring-0'
              : 'opacity-0 pointer-events-none',
        )
      "
      :placeholder="PLACEHOLDERS[props.type]"
      required
    />
  </div>
</template>
