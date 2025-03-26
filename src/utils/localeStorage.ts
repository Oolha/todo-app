import { Todo } from "@/types";

const TODO_STORAGE_KEY = "todos";

//get todos from localeStorage

export const getStoredTodos = (): Todo[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedData = localStorage.getItem(TODO_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

//save todos to lS

export const storeTodos = (todos: Todo[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

//clear todos from lS

export const clearStoredTodos = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(TODO_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
