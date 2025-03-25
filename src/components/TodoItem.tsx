"use client";
import { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div>
      <span>{todo.title}</span>
    </div>
  );
};
export default TodoItem;
