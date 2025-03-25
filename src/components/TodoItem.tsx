"use client";
import { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="mr-3 h-4 w-4 text-blue-600"
        />
        <span>{todo.title}</span>
      </div>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};
export default TodoItem;
