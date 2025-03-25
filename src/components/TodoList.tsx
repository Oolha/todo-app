"use client";
import { NewTodo } from "@/types";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodoQueries } from "@/hooks/useTodoQueries";
import { useTodoMutations } from "@/hooks/useTodoMutations";

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const { todosQuery } = useTodoQueries();
  const { addTodoMutation, deleteTodoMutation } = useTodoMutations();

  const { data: todos = [], isLoading, error } = todosQuery;

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoText.trim()) return;

    const newTodo: NewTodo = {
      title: newTodoText.trim(),
      completed: false,
      userId: 1,
    };

    addTodoMutation.mutate(newTodo);
    setNewTodoText("");
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <div className="flex">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </div>
      </form>

      {isLoading && <p className="text-center py-4">Loading...</p>}
      {error && (
        <p className="text-center py-4 text-red-500">
          Failed to load task list. Please try again later.
        </p>
      )}

      <div className="space-y-3">
        {todos.length === 0 && !isLoading ? (
          <p className="text-center text-gray-500">No tasks yet</p>
        ) : (
          todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} onDelete={handleDeleteTodo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
