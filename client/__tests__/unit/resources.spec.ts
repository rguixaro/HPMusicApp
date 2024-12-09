import { setActivePinia, createPinia } from 'pinia'

import { queryResources } from '../../src/services/api/resources'
import { useResourcesStore } from '../../src/stores/resources'
import { AlbumItemSample, SingleItemSample } from '../mock'

export const ResourcesSample = {
  albums: [AlbumItemSample],
  singles: [SingleItemSample],
  eps: [],
}

describe('useResourcesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('set resources', () => {
    const resourcesStore = useResourcesStore()
    resourcesStore.set(ResourcesSample)

    expect(resourcesStore.albums.length).toBe(1)
    expect(resourcesStore.singles.length).toBe(1)
    expect(resourcesStore.eps.length).toBe(0)
  })

  test('clear resources', () => {
    const resourcesStore = useResourcesStore()
    resourcesStore.set(ResourcesSample)
    resourcesStore.clear()

    expect(resourcesStore.albums.length).toBe(0)
    expect(resourcesStore.singles.length).toBe(0)
    expect(resourcesStore.eps.length).toBe(0)
    expect(resourcesStore.empty).toBe(true)
  })

  test('save api response to store', async () => {
    const { resources } = await queryResources('elephanz')
    const resourcesStore = useResourcesStore()

    if (resources) {
      resourcesStore.set(resources)
      expect(resourcesStore.albums.length).toBeGreaterThan(0)
      expect(resourcesStore.singles.length).toBeGreaterThan(0)
      expect(resourcesStore.eps.length).toBeGreaterThan(0)
      expect(resourcesStore.empty).toBe(false)
    } else {
      expect(resourcesStore.empty).toBe(true)
    }
  })
})
