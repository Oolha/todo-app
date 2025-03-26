"use client";
import { useTodoMutations } from "@/hooks/useTodoMutations";
import { Todo } from "@/types";
import { motion } from "framer-motion";
import { TrashIcon } from "@/components/Icons";
import CongratulationModal from "./CongratulationModal";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const { deleteTodoMutation, toggleTodoMutation } = useTodoMutations();

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  const handleToggleCompleted = () => {
    if (!todo.completed) {
      setShowCongrats(true);
    }

    toggleTodoMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return (
    <>
      <motion.div
        className="flex items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:translate-y-[-2px] hover:shadow transition-all"
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
          className="appearance-none w-5 h-5 border-2 border-pink-100 rounded-full mr-3 cursor-pointer relative transition-colors checked:bg-green-300 checked:border-green-300"
          aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
        />

        <span
          className={`flex-grow text-sm transition-colors ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>

        <motion.button
          onClick={handleDelete}
          className="text-red-400 bg-transparent border-none cursor-pointer p-1 rounded hover:bg-red-100 transition-colors"
          aria-label={`Delete "${todo.title}"`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <TrashIcon />
        </motion.button>
      </motion.div>

      <CongratulationModal
        isOpen={showCongrats}
        onClose={() => setShowCongrats(false)}
      />
    </>
  );
};

export default TodoItem;
