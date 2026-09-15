import type { SearchResponse } from './types.js';

export async function searchItems(query: string, category: string, sort: string): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    category,
    sort,
  });

  const response = await fetch(`/api/search?${params}`);

  if (!response.ok) {
    throw new Error('Unable to complete search');
  }

  return response.json() as Promise<SearchResponse>;
}
