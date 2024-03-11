import { useEffect, useState } from "react";
import { getTodos } from "../api/todo";
import { ITodo } from "../types";

interface Props {
  todos: ITodo[];
  loading: boolean;
  error: string;
}

export const useTodos = (): Props => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchTodos = () => {
    getTodos()
      .then(({ data }) => {
        setTodos(data.todos);
      })
      .catch((err) => setError(err))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, loading, error };
};
