import type { Resource } from '@/stores/resources'

import API from './client'

/**
 * Apple Music API Response type definition
 */
export interface QueryResourcesResponse {
  albums: Resource[]
  singles: Resource[]
  eps: Resource[]
}

/**
 * Empty response for when no resources are found
 */
const EmptyQueryResourcesResponse: QueryResourcesResponse = {
  albums: [],
  singles: [],
  eps: [],
}

/**
 * Query the API for resources based on the query string
 * @param query
 * @returns Promise<QueryResourcesResponse>
 */
export async function queryResources(query: string): Promise<QueryResourcesResponse> {
  try {
    const response = await API.get('albums', { params: { artist: query } })
    if (response.data.success) return response.data.resources
    return EmptyQueryResourcesResponse
  } catch (error) {
    console.error(error)
    return EmptyQueryResourcesResponse
  }
}
