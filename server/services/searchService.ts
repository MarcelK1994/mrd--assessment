import type { CatalogItem, SearchOptions, SearchResponse, SortOption } from '../types/index.js';
import catalogData from '../data/catalog.json' with { type: 'json' };

const catalog: CatalogItem[] = catalogData as CatalogItem[];

function toNormalized(value: string): string {
  return value.trim().toLowerCase();
}

function matchesQuery(item: CatalogItem, query: string): boolean {
  const normalizedQuery = toNormalized(query);

  if (!normalizedQuery) {
    return true;
  }

  return [
    item.name,
    item.category,
    item.description,
  ].some((field) => field.toLowerCase().includes(normalizedQuery));
}

function filterByCategory(items: CatalogItem[], category: string): CatalogItem[] {
  const normalizedCategory = toNormalized(category);

  if (!normalizedCategory) {
    return items;
  }

  return items.filter((item) => toNormalized(item.category) === normalizedCategory);
}

function sortResults(items: CatalogItem[], sort: SortOption | string): CatalogItem[] {
  const currentSort = (sort ?? 'price-asc') as SortOption;

  const sorted = [...items];

  sorted.sort((left, right) => {
    if (currentSort === 'price-desc') {
      return right.price - left.price;
    }

    return left.price - right.price;
  });

  return sorted;
}

export function searchCatalog(items: CatalogItem[], options: SearchOptions): CatalogItem[] {
  const filtered = items.filter((item) => matchesQuery(item, options.query));
  const byCategory = filterByCategory(filtered, options.category);

  return sortResults(byCategory, options.sort);
}

export function getSearchResponse(options: SearchOptions): SearchResponse {
  const items = searchCatalog(catalog, options);

  return {
    items,
    total: items.length,
  };
}
