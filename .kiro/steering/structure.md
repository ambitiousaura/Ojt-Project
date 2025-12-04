# Project Structure

## File Organization

```
/
├── indexes.html       # Main HTML entry point
├── styles.css         # All application styles
├── main.js           # Application entry point
├── ui.js             # DOM manipulation and rendering
├── tasks.js          # Task state management and CRUD
├── storage.js        # LocalStorage persistence layer
├── utils.js          # Utility functions (debounce)
├── i18n.js           # Internationalization (en, hi)
└── learn/            # Empty folder (future use)
```

## Module Responsibilities

### main.js
Entry point that initializes the app on DOMContentLoaded.

### ui.js
- DOM element references
- View state management (search, sort, filter, pagination)
- Event listener setup
- Rendering logic
- User interaction handlers

### tasks.js
- In-memory task array
- Pub-sub pattern for state changes
- CRUD operations (add, edit, delete, toggle)
- Undo/redo with snapshot stacks
- Data export/import

### storage.js
- LocalStorage read/write operations
- JSON serialization/deserialization
- Storage key: `"task-board-tasks"`

### i18n.js
- Translation dictionaries (English, Hindi)
- Language switching logic
- DOM text updates via `data-i18n` attributes
- Language preference persistence

### utils.js
- Debounce function for search input optimization

## Architecture Patterns

- **Module Pattern**: ES6 modules with explicit exports
- **Pub-Sub**: Tasks module notifies UI of state changes via callbacks
- **Separation of Concerns**: Clear boundaries between UI, state, and persistence
- **Command Pattern**: Undo/redo using state snapshots

## Naming Conventions

- **Files**: lowercase with hyphens (not used here, but single words)
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE (e.g., `PAGE_SIZE`, `STORAGE_KEY`)
- **CSS classes**: BEM-inspired with double underscores and hyphens

## State Management

- Tasks state lives in `tasks.js`
- View state (search, sort, filter, page) lives in `ui.js`
- Undo/redo stacks store JSON snapshots of task array
- LocalStorage synced on every state mutation
