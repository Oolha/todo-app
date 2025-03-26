import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/services/todoService";
import { Todo } from "@/types";
import { useEffect } from "react";
import { storeTodos } from "@/utils/localeStorage";

export const useTodoQueries = () => {
  const TODOS_QUERY_KEY = ["todos"];

  //5 minutes
  const STALE_TIME = 5 * 60 * 1000;

  const todosQuery = useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: getTodos,
    staleTime: STALE_TIME,
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
