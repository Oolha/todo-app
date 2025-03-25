"use client";

import { getTodos } from "@/services/todoService";
import { Todo } from "@/types";
import React from "react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";

const TodoList: React.FC = () => {
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p style={{ color: "red" }}>
          Failed to load task list. Please try again later.
        </p>
      )}
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
