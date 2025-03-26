"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  toggleTodoCompletion,
} from "@/services/todoService";
import { NewTodo, Todo } from "@/types";
import { storeTodos } from "@/utils/localStorage";
import { QUERY_KEYS } from "@/utils/constants";

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const generateTempId = (): number => -Math.floor(Math.random() * 10000);

  const updateTodoCache = (todos: Todo[]): void => {
    queryClient.setQueryData<Todo[]>(QUERY_KEYS.TODOS, todos);
    storeTodos(todos);
  };

  //Get the current todos
  const getCurrentTodos = (): Todo[] =>
    queryClient.getQueryData<Todo[]>(QUERY_KEYS.TODOS) || [];

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: NewTodo) => addTodo(newTodo),

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TODOS });

      const previousTodos = getCurrentTodos();
      const optimisticTodo: Todo = {
        ...newTodo,
        id: generateTempId(),
      };
      const updatedTodos = [optimisticTodo, ...previousTodos];
      updateTodoCache(updatedTodos);

      return { previousTodos, tempId: optimisticTodo.id };
    },

    //revert to previous state
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        updateTodoCache(context.previousTodos);
      }
    },

    //update the temporary ID with real one
    onSuccess: (newTodo, _, context) => {
      if (context?.tempId) {
        const currentTodos = getCurrentTodos();
        const updatedTodos = currentTodos.map((todo) =>
          todo.id === context.tempId ? { ...todo, id: newTodo.id } : todo
        );

        updateTodoCache(updatedTodos);
      }
    },
  });

  //Delete todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TODOS });
      const previousTodos = getCurrentTodos();

      const updatedTodos = previousTodos.filter((todo) => todo.id !== id);
      updateTodoCache(updatedTodos);

      return { previousTodos };
    },

    //revert to previous state
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        updateTodoCache(context.previousTodos);
      }
    },
  });

  //Toggle todo completion status

  const toggleTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodoCompletion(id, completed),

    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TODOS });

      const previousTodos = getCurrentTodos();
      const updatedTodos = previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      );

      updateTodoCache(updatedTodos);

      return { previousTodos };
    },

    //revert to previous state
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        updateTodoCache(context.previousTodos);
      }
    },
  });

  return {
    addTodoMutation,
    deleteTodoMutation,
    toggleTodoMutation,
  };
};
