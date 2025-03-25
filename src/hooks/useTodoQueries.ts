import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/services/todoService";
import { Todo } from "@/types";

export const useTodoQueries = () => {
  const todosQuery = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  return {
    todosQuery,
  };
};
