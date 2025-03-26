"use client";
import { useState } from "react";
import { useTodoMutations } from "@/hooks/useTodoMutations";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Todo } from "@/types";

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
    <div
      className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 ${
        todo.completed ? "bg-gray-50" : "bg-white"
      } ${isHovered ? "shadow-md" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center flex-1">
        <div
          onClick={handleToggleCompleted}
          className="cursor-pointer flex items-center"
          role="checkbox"
          aria-checked={todo.completed}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleToggleCompleted();
            }
          }}
        >
          {todo.completed ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
          ) : (
            <div className="h-5 w-5 border-2 rounded-full border-gray-300 mr-3" />
          )}
        </div>

        <span
          className={`${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          } transition-all duration-200`}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 transition duration-200 p-2 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        aria-label="Delete todo"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
export default TodoItem;
