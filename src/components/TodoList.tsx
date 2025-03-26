"use client";
import { NewTodo } from "@/types";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodoQueries } from "@/hooks/useTodoQueries";
import { useTodoMutations } from "@/hooks/useTodoMutations";

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const { todosQuery } = useTodoQueries();
  const { addTodoMutation } = useTodoMutations();

  const { data: todos = [], isLoading, error } = todosQuery;

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = newTodoText.trim();
    if (!trimmedText) return;

    const newTodo: NewTodo = {
      title: trimmedText,
      completed: false,
      userId: 1,
    };

    addTodoMutation.mutate(newTodo);
    setNewTodoText("");
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
          todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        )}
      </div>
      {/* Todo Summary */}
      {!isLoading && todos.length > 0 && (
        <div className="mt-6 pt-4 border-t text-sm text-gray-500 flex justify-between">
          <span>Total: {todos.length} tasks</span>
          <span>
            Completed: {todos.filter((todo) => todo.completed).length} /{" "}
            {todos.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default TodoList;
