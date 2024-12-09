import { queryResources } from '../../src/services/api/resources'

describe('queryResources', () => {
  test('handle response', async () => {
    const { resources, error } = await queryResources('elephanz')
    if (error) expect(error).toBe(true)
    else {
      expect(resources).toHaveProperty('albums')
      expect(resources).toHaveProperty('singles')
      expect(resources).toHaveProperty('eps')
    }
  })
})
