import { Todo } from "@/types";
import { STORAGE_KEYS } from "@/utils/constants";

//get todos from localStorage

export const getStoredTodos = (): Todo[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedData = localStorage.getItem(STORAGE_KEYS.TODOS);
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
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

//clear todos from lS

export const clearStoredTodos = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEYS.TODOS);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
