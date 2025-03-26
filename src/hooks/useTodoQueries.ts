import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/services/todoService";
import { useEffect } from "react";
import { storeTodos } from "@/utils/localStorage";
import { QUERY_KEYS, STALE_TIMES } from "@/utils/constants";

export const useTodoQueries = () => {
  const todosQuery = useQuery({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: getTodos,
    staleTime: STALE_TIMES.TODOS,
  });

  // When todos are successfully fetched and not from localStorage,
  // store them in localStorage for offline/refresh persistence
  useEffect(() => {
    if (todosQuery.isSuccess && todosQuery.data.length > 0) {
      storeTodos(todosQuery.data);
    }
  }, [todosQuery.isSuccess, todosQuery.data]);

  return {
    todosQuery,
  };
};
