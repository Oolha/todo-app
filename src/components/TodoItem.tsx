"use client";
import { useState } from "react";
import { useTodoMutations } from "@/hooks/useTodoMutations";
import { Todo } from "@/types";
import { motion } from "framer-motion";
import { TrashIcon } from "@/components/Icons";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { deleteTodoMutation, toggleTodoMutation } = useTodoMutations();

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  const handleToggleCompleted = () => {
    toggleTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return (
    <motion.div
      className="todo-item"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleCompleted}
        className="todo-checkbox"
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
      />

      <span
        className={`todo-text ${todo.completed ? "todo-text-completed" : ""}`}
      >
        {todo.title}
      </span>

      <motion.button
        onClick={handleDelete}
        className="todo-delete"
        aria-label={`Delete "${todo.title}"`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <TrashIcon />
      </motion.button>
    </motion.div>
  );
};
export default TodoItem;
