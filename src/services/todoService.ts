import axios from "axios";
import { NewTodo, Todo } from "@/types";
import { getStoredTodos } from "@/utils/localStorage";
import { API } from "@/utils/constants";

const todoApi = axios.create({
  baseURL: API.TODO_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//get todos

export const getTodos = async (): Promise<Todo[]> => {
  const localTodos = getStoredTodos();

  if (localTodos.length > 0) {
    return localTodos;
  }

  try {
    const response = await todoApi.get<Todo[]>(`?_limit=${API.DEFAULT_LIMIT}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
};
//add new todo

export const addTodo = async (newTodo: NewTodo): Promise<Todo> => {
  try {
    const response = await todoApi.post<Todo>("", newTodo);
    return response.data;
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw error;
  }
};

//delete todo

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await todoApi.delete(`/${id}`);
  } catch (error) {
    console.error(`Failed to delete todo with id ${id}:`, error);
    throw error;
  }
};

//toggle todo completion status

export const toggleTodoCompletion = async (
  id: number,
  completed: boolean
): Promise<void> => {
  try {
    await todoApi.patch(`/${id}`, { completed });
  } catch (error) {
    console.error(`Failed to toggle todo completion with id ${id}:`, error);
    throw error;
  }
};
