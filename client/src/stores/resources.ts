import { defineStore } from 'pinia'

/**
 * Album Item type definition
 */
export type Resource = {
  wrapperType: string
  collectionType: string
  artistId: number
  collectionId: number
  artistName: string
  collectionName: string
  artistViewUrl: string
  artworkUrl100: string
  trackCount: number
  releaseDate: string
  collectionExplicitness: 'explicit' | 'cleaned' | 'notExplicit'
}

/**
 * Resources store
 */
export const useResourcesStore = defineStore('resources', {
  state: () => {
    return {
      empty: true,
      albums: [] as Resource[],
      singles: [] as Resource[],
      eps: [] as Resource[],
    }
  },
  actions: {
    set(resources: { albums: Resource[]; singles: Resource[]; eps: Resource[] }) {
      this.albums = resources.albums
      this.singles = resources.singles
      this.eps = resources.eps
      if (this.albums.length || this.singles.length || this.eps.length) this.empty = false
    },
    clear() {
      this.albums = []
      this.singles = []
      this.eps = []
      this.empty = true
    },
  },
})
