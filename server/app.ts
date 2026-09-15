import express from 'express';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getSearchResponse } from './services/searchService.js';

const app = express();
const port = Number(3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../dist');
const clientSourcePath = path.resolve(__dirname, '../client');
const clientRoot = existsSync(clientDistPath) ? clientDistPath : clientSourcePath;

app.use(express.static(clientRoot));

app.get('/api/search', (req, res) => {
  const query = typeof req.query.q === 'string' ? req.query.q : '';
  const category = typeof req.query.category === 'string' ? req.query.category : '';
  const sort = typeof req.query.sort === 'string' ? req.query.sort : 'price-asc';

  try {
    const response = getSearchResponse({ query, category, sort });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Search failed',
      items: [],
      total: 0,
    });
  }
});

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientRoot, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
