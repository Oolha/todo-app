import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, deleteTodo } from "@/services/todoService";
import { NewTodo, Todo } from "@/types";

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  //mutation to add todo
  const addTodoMutation = useMutation({
    mutationFn: (newTodo: NewTodo) => addTodo(newTodo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      const optimisticTodo: Todo = {
        ...newTodo,
        id: Date.now(),
      };

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        optimisticTodo,
        ...old,
      ]);

      return { previousTodos, tempId: optimisticTodo.id };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSuccess: (newTodo, variables, context) => {
      if (context?.tempId) {
        queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) =>
          oldTodos.map((todo) =>
            todo.id === context.tempId ? { ...todo, id: newTodo.id } : todo
          )
        );
      }
    },
  });

  //mutation to delete todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });

  return {
    addTodoMutation,
    deleteTodoMutation,
  };
};
