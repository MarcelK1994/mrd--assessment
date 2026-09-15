export type SortOption = 'price-asc' | 'price-desc';

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  available: boolean;
  deliveryEstimate: string;
}

export interface SearchOptions {
  query: string;
  category: string;
  sort: SortOption | string;
}

export interface SearchResponse {
  items: CatalogItem[];
  total: number;
}
