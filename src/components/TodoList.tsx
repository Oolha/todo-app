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
    <div className="max-w-lg mx-auto my-8 bg-white rounded-2xl shadow-md p-6">
      <motion.h1
        className="text-pink-500 text-center font-bold text-2xl mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Todo List
      </motion.h1>
      <motion.form
        onSubmit={handleAddTodo}
        className="flex mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow py-3 px-4 border border-gray-100 rounded-l-lg text-sm shadow-sm focus:outline-none focus:border-pink-300 focus:ring-3 focus:ring-pink-100 transition-colors"
          aria-label="New todo text"
        />
        <button
          type="submit"
          disabled={!newTodoText.trim()}
          className="bg-pink-300 text-white font-semibold px-4 rounded-r-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-500 transition-colors"
          aria-label="Add new todo"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add
        </button>
      </motion.form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="border-4 border-gray-100 border-t-pink-300 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 rounded-lg p-4 text-red-600 text-center my-4">
          Failed to load task list. Please try again later.
        </div>
      )}

      {/* Empty State */}
      {!isLoading && todos.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          No tasks yet
        </div>
      )}

      {/* Todo List with AnimatePresence */}
      <AnimatePresence>
        {!isLoading && todos.length > 0 && (
          <motion.div
            className="flex flex-col gap-3"
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
          <div className="mt-5 bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-pink-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mt-3">
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
