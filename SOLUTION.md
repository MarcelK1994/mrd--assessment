# Solution Overview

This project is a small TypeScript full-stack catalogue search application built around a simple but deliberate architecture:

- The server is built with Node.js and Express in TypeScript.
- The client is plain browser JavaScript/TypeScript with HTML and CSS, intentionally without a framework.
- The catalogue is loaded from a local JSON source and searched by the server, rather than doing heavy client-side filtering.

The goal was to satisfy the assignment without introducing unnecessary complexity while still demonstrating solid engineering choices and separation of responsibilities.

## Architecture

### Server-side

The Express app exposes a single API endpoint:

- `GET /api/search?q=&category=&sort=`

This endpoint:

1. Reads the query parameters.
2. Calls the search service.
3. Filters by text and category.
4. Sorts results by price.
5. Returns a JSON response containing the matching items and total count.

The search logic is isolated into a dedicated service, which improves maintainability and makes it easy to test without starting the whole server.

### Client-side

The browser UI is intentionally simple and framework-free. It is split into a few responsibilities:

- `api.ts` manages HTTP requests.
- `ui.ts` handles rendering of loading, error, and empty states.
- `main.ts` orchestrates event handlers and user interaction.

This keeps the client readable and avoids mixing network logic, presentation logic, and page state in one large file.

## Design decisions and trade-offs

### 1. Vanilla JavaScript on the client

I chose not to introduce React or another framework because the assignment is small and the requirement does not mandate a frontend framework.

This trade-off keeps the codebase lean and easier to explain in a short implementation walk-through. It also makes the separation of concerns explicit rather than hidden behind framework conventions.

The downside is that the client has more manual DOM handling and state management than a framework-based app would. However, for a small catalogue search feature, this is a pragmatic and appropriate choice.

### 2. Search logic on the server

The server owns the search behaviour rather than the browser. This is the stronger architectural decision for this app because:

- it matches the assignment requirement around a Node/Express service,
- it keeps the API clean,
- it makes the search logic easier to test,
- it avoids sending the full catalogue to the browser and relying on client-side filtering.

This is especially important for a data-driven app where the backend is expected to own business logic.

### 3. Pure, testable search functions

The search service exposes functions such as:

- `searchCatalog(...)`
- `getSearchResponse(...)`

These functions are deterministic and simple to unit test. The tests cover:

- query matching across name, description, and category,
- category filtering,
- price sorting,
- no-match behaviour.

This reduces regression risk and gives a clear path to future changes.

### 4. Explicit UI states

Because the client is not using a reactive framework, UI states are handled explicitly:

- loading
- success
- empty
- error

This is important because it prevents ambiguous or scattered state management. The user always sees a clear result state, which is better than silently leaving stale content on screen during a search.

### 5. Simple data model

The catalogue items are intentionally small and structured. Each item includes fields for:

- id
- name
- category
- description
- price
- availability
- delivery estimate

This keeps the app easy to reason about and avoids over-engineering with repositories, services, or abstraction layers that are not necessary at this scope.

## Why this is a good fit for the assignment

This solution balances clarity, maintainability, and technical depth:

- It demonstrates TypeScript proficiency on both server and client.
- It uses Express for backend functionality.
- It keeps the frontend lightweight and understandable.
- It shows sound architectural judgment by separating API, business logic, and rendering.
- It avoids over-engineering while still being production-minded.

## Future improvements

If this were extended beyond the assessment, the next logical improvements would be:

- adding debounced typeahead search,
- adding URL state sync for filters and queries,
- adding provider simulation or live availability enrichment,
- adding more robust error handling and retry logic,
- introducing a more formal client state model if the UI becomes larger.

For the current assignment, the chosen design is intentionally lean, maintainable, and aligned with the brief.
