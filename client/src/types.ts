export interface SearchResult {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  available: boolean;
  deliveryEstimate: string;
}

export interface SearchResponse {
  items: SearchResult[];
  total: number;
}
