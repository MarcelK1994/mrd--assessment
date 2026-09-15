import { describe, expect, it } from 'vitest';
import { searchCatalog } from './searchService.js';

describe('searchCatalog', () => {
  it('matches a query across name, description and category', () => {
    const results = searchCatalog(
      [
        {
          id: '1',
          name: 'Classic Burger',
          category: 'Burgers',
          description: 'A juicy beef burger.',
          price: 120,
          available: true,
          deliveryEstimate: '25-35 min',
        },
        {
          id: '2',
          name: 'Margherita Pizza',
          category: 'Pizza',
          description: 'Fresh tomato and basil pizza.',
          price: 110,
          available: true,
          deliveryEstimate: '30-40 min',
        },
      ],
      { query: 'burger', category: '', sort: 'price-asc' },
    );

    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe('Classic Burger');
  });

  it('filters by category and sorts by price ascending', () => {
    const results = searchCatalog(
      [
        { id: 'a', name: 'Coke', category: 'Drinks', description: 'Cold drink', price: 35, available: true, deliveryEstimate: '10 min' },
        { id: 'b', name: 'Pepperoni Pizza', category: 'Pizza', description: 'Spicy pizza', price: 150, available: true, deliveryEstimate: '25 min' },
        { id: 'c', name: 'Cheese Pizza', category: 'Pizza', description: 'Classic cheese', price: 120, available: true, deliveryEstimate: '25 min' },
      ],
      { query: '', category: 'Pizza', sort: 'price-asc' },
    );

    expect(results.map((item: { name: string }) => item.name)).toEqual(['Cheese Pizza', 'Pepperoni Pizza']);
  });

  it('returns an empty array when no items match', () => {
    const results = searchCatalog(
      [
        { id: '1', name: 'Classic Burger', category: 'Burgers', description: 'A juicy beef burger.', price: 120, available: true, deliveryEstimate: '25-35 min' },
      ],
      { query: 'sushi', category: '', sort: 'price-asc' },
    );

    expect(results).toEqual([]);
  });
});
