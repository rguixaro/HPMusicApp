<script setup lang="ts">
import { ref, reactive } from 'vue'

import { useResourcesStore, type Resource } from '@/stores/resources'
import AlbumItem from '@/components/core/AlbumItem.vue'
import TrackItem from '@/components/core/TrackItem.vue'
import SearchInput from '@/components/core/SearchInput.vue'
import { cn } from '@/utils/cn'

const store = useResourcesStore()
store.$subscribe((state) => {
  /* @ts-ignore */
  albums.list = state.events.target?.albums
  /* @ts-ignore */
  singles.list = state.events.target?.singles
  /* @ts-ignore */
  eps.list = state.events.target?.eps
})

const albums = reactive({ list: store.albums })
const singles = reactive({ list: store.singles })
const eps = reactive({ list: store.eps })

const singlesQuery = ref('')
const albumsQuery = ref('')
const epsQuery = ref('')

/**
 * Filter the list of resources
 * @param type
 * @param query
 * @returns {Resource[]}
 */
type ResourceType = 'albums' | 'singles' | 'eps'

function filter(type: ResourceType, query: string) {
  return store[type].filter((item: Resource) =>
    item.collectionName.toLowerCase().includes(query.toLowerCase()),
  )
}

/**
 * Update the query for the specified type
 * @param param0 { type: 'album' | 'single' | 'ep', query: string }
 */
function update({ type, query }: { type: 'album' | 'single' | 'ep'; query: string }) {
  if (type === 'album') {
    albumsQuery.value = query
    albums.list = filter('albums', query)
  } else if (type === 'single') {
    singlesQuery.value = query
    singles.list = filter('singles', query)
  } else {
    epsQuery.value = query
    eps.list = filter('eps', query)
  }
}
</script>
<!--  -->
<template>
  <main class="relative pt-16 h-screen w-[calc(100vw-14rem)] overflow-y-auto">
    <div
      v-if="store.empty"
      class="flex flex-col justify-evenly items-center h-full bg-gradient-to-br from-[#e93046] from-5% via-[#eb2238] via-10% to-[#e93046] to-90%"
    >
      <div class="flex flex-col justify-center items-center">
        <img class="w-64 mb-5" src="@/assets/logo.svg" />
        <h1 class="text-white font-bold text-4xl tracking-wide mt-5">
          Discover new music every day.
        </h1>
      </div>
      <img class="w-96 mb-5" src="@/assets/musical-note.svg" />
    </div>
    <div v-else>
      <div v-if="store.albums.length > 0" class="flex">
        <h1 class="mx-5 mt-5 text-lg text-white font-bold">Albums</h1>
        <SearchInput @change="update" type="album" />
      </div>
      <div
        v-if="albums.list.length > 0"
        :class="
          cn(
            'px-5 w-full overflow-y-auto grid grid-rows-1 grid-flow-col auto-cols-max gap-3 pb-5',
            albums.list.length > 2 && 'grid-rows-2',
          )
        "
      >
        <div v-for="item of albums.list">
          <AlbumItem :item="item" />
        </div>
      </div>
      <div v-else-if="store.albums.length > 0" class="px-5">
        <p class="text-neutral-500 font-semibold">No albums found</p>
      </div>
      <div v-if="store.singles.length > 0" class="flex">
        <h1 class="mx-5 mt-5 text-lg text-white font-bold">Singles</h1>
        <SearchInput @change="update" type="single" />
      </div>
      <div
        v-if="singles.list.length > 0"
        class="px-5 w-full overflow-y-auto grid grid-rows-3 grid-flow-col auto-cols-max gap-3 pb-5"
      >
        <div v-for="item of singles.list">
          <TrackItem :item="item" />
        </div>
      </div>
      <div v-else-if="store.singles.length > 0" class="px-5">
        <p class="text-neutral-500 font-semibold">No singles found</p>
      </div>
      <div v-if="store.eps.length > 0" class="flex">
        <h1 class="mx-5 mt-5 text-lg text-white font-bold">EPs</h1>
        <SearchInput @change="update" type="ep" />
      </div>
      <div
        v-if="eps.list.length > 0"
        class="px-5 w-full overflow-y-auto grid grid-rows-1 grid-flow-col auto-cols-max gap-3 pb-5"
      >
        <div v-for="item of eps.list">
          <TrackItem :key="item.collectionId" :item="item" />
        </div>
      </div>
      <div v-else-if="store.eps.length > 0" class="px-5">
        <p class="text-neutral-500 font-semibold">No EPs found</p>
      </div>
    </div>
  </main>
</template>
