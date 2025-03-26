// Query Keys
export const QUERY_KEYS = {
  TODOS: ["todos"],
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TODOS: "todos",
};

// API Settings
export const API = {
  TODO_BASE_URL: "https://jsonplaceholder.typicode.com/todos",
  DEFAULT_LIMIT: 10,
};

// Stale times for React Query
export const STALE_TIMES = {
  TODOS: 5 * 60 * 1000, // 5 minutes
};
