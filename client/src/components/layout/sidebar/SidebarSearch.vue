<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'
import { toast } from 'vue-sonner'

import { queryResources } from '@/services/api/resources'
import { useResourcesStore } from '@/stores/resources'
import { cn } from '@/utils/cn'

const router = useRouter()
const route = useRoute()

const { clear, set } = useResourcesStore()
const form = reactive({ query: '' })

/**
 * Search for resources
 */
async function search() {
  const { resources, error } = await queryResources(form.query)
  if (error || !resources)
    toast.error('Something went wrong.', {
      class: 'bg-[#3a3a3b] rounded-lg px-5 w-auto border-accent border-2 text-white font-bold',
    })
  else {
    set(resources)
    if (route.path !== '/') router.push('/')
  }
}

/**
 * Update the search results with a debounce
 */
const update = debounce(() => {
  if (form.query.length > 1) search()
  else clear()
}, 500)

/**
 * Watch for changes in the form
 */
watch(form, () => {
  update()
})
</script>

<template>
  <div class="w-full my-5">
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-accent"
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
      </div>
      <input
        type="search"
        v-model="form.query"
        id="default-search"
        :class="
          cn(
            'block w-full py-1.5 ps-10 text-sm bg-[#1f1f1f] text-white placeholder-neutral-400 border-[1px]',
            'transition duration-100 border-[#404040] rounded-[5px]',
            'focus:ring-2 focus:ring-accent focus:outline-none',
          )
        "
        placeholder="Search artist"
        required
      />
    </div>
  </div>
</template>
