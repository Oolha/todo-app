"use client";
import { NewTodo } from "@/types";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodoQueries } from "@/hooks/useTodoQueries";
import { useTodoMutations } from "@/hooks/useTodoMutations";
import { PlusIcon } from "@/components/Icons";
import { motion, AnimatePresence } from "framer-motion";

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const { todosQuery } = useTodoQueries();
  const { addTodoMutation } = useTodoMutations();

  const { data: todos = [], isLoading, error } = todosQuery;

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progressPercentage =
    todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

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
    <div className="todo-container">
      <motion.h1
        className="todo-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Todo List
      </motion.h1>
      <motion.form
        onSubmit={handleAddTodo}
        className="todo-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
          aria-label="New todo text"
        />
        <button
          type="submit"
          disabled={!newTodoText.trim()}
          className="todo-button"
          aria-label="Add new todo"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add
        </button>
      </motion.form>

      {/* Loading State */}
      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center py-4 text-red-500">
          Failed to load task list. Please try again later.
        </p>
      )}

      {/* Empty State */}
      {!isLoading && todos.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet</p>
      )}

      {/* Todo List with AnimatePresence */}
      <AnimatePresence>
        {!isLoading && todos.length > 0 && (
          <motion.div
            className="todo-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      {!isLoading && todos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="progress-container">
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>

          <div className="todo-status">
            <span>Total: {todos.length} tasks</span>
            <span>
              Completed: {completedCount} / {todos.length}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default TodoList;
