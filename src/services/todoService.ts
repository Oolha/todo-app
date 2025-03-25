import { ApiError, NewTodo, Todo } from "@/types";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

//get todos
export const getTodos = async (limit: number = 10): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>(`${BASE_URL}?_limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw createApiError(error, "Failed to fetch todos");
  }
};

//add new todo
export const addTodo = async (todo: NewTodo): Promise<Todo> => {
  try {
    const response = await axios.post<Todo>(BASE_URL, todo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw createApiError(error, "Failed to add todo");
  }
};

//delete todo
export const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw createApiError(error, "Failed to delete todo");
  }
};

//create an error object
const createApiError = (error: unknown, defaultMessage: string): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message || defaultMessage,
      status: error.response?.status,
      code: error.code,
    };
  }

  return {
    message: error instanceof Error ? error.message : defaultMessage,
  };
};
