import { searchItems } from './api.js';
import { renderResults, setError, setLoading } from './ui.js';

const form = document.querySelector<HTMLFormElement>('#search-form');
const searchInput = document.querySelector<HTMLInputElement>('#search-input');
const categoryFilter = document.querySelector<HTMLSelectElement>('#category-filter');
const sortSelect = document.querySelector<HTMLSelectElement>('#sort-select');

const categories = [
  'Burgers',
  'Pizza',
  'Drinks',
  'Desserts',
  'Salads',
];

function populateCategoryOptions(): void {
  if (!categoryFilter) {
    return;
  }

  categoryFilter.innerHTML = ['<option value="">All categories</option>']
    .concat(categories.map((category) => `<option value="${category}">${category}</option>`))
    .join('');
}

async function runSearch(): Promise<void> {
  if (!form || !searchInput || !categoryFilter || !sortSelect) {
    return;
  }

  const query = searchInput.value.trim();
  const category = categoryFilter.value;
  const sort = sortSelect.value;

  setLoading();

  try {
    const response = await searchItems(query, category, sort);
    renderResults(response.items);
  } catch {
    setError();
  }
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  void runSearch();
});

categoryFilter?.addEventListener('change', () => {
  void runSearch();
});

sortSelect?.addEventListener('change', () => {
  void runSearch();
});

populateCategoryOptions();
void runSearch();
