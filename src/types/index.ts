export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface NewTodo {
  title: string;
  completed: boolean;
  userId: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
