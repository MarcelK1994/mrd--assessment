import type { SearchResult } from './types.js';

const statusEl = document.querySelector('#status') as HTMLElement | null;
const resultsEl = document.querySelector('#results') as HTMLElement | null;

export function setStatus(message: string, tone: 'info' | 'error' | 'empty' = 'info'): void {
  if (!statusEl) {
    return;
  }

  statusEl.className = `status ${tone}`;
  statusEl.textContent = message;
}

export function renderResults(items: SearchResult[]): void {
  if (!resultsEl) {
    return;
  }

  if (items.length === 0) {
    resultsEl.innerHTML = '';
    setStatus('No results found for this search. Try a different term or category.', 'empty');
    return;
  }

  resultsEl.innerHTML = items
    .map(
      (item) => `
        <article class="result-card">
          <div class="meta">
            <span class="tag">${escapeHtml(item.category)}</span>
            <span class="price">R${item.price}</span>
          </div>
          <h2>${escapeHtml(item.name)}</h2>
          <p>${escapeHtml(item.description)}</p>
          <div class="badges">
            <span class="availability ${item.available ? 'in' : 'out'}">
              ${item.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
          <div class="delivery">Delivery: ${escapeHtml(item.deliveryEstimate)}</div>
        </article>
      `,
    )
    .join('');

  setStatus(`Showing ${items.length} result${items.length === 1 ? '' : 's'}.`, 'info');
}

export function setLoading(): void {
  if (!resultsEl) {
    return;
  }

  resultsEl.innerHTML = '';
  setStatus('Searching catalogue and live availability...', 'info');
}

export function setError(): void {
  if (!resultsEl) {
    return;
  }

  resultsEl.innerHTML = '';
  setStatus('Something went wrong while searching. Please try again.', 'error');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
