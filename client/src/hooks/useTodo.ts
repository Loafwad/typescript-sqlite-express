import { useState, useMemo } from "react";
import { addTodo, deleteTodo, updateTodo } from "../api/todo";
import { ITodo } from "../types";

interface TodoHookProps {
  handleSaveTodo: (e: React.FormEvent, formData: ITodo) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: (todo: ITodo) => void;
  todo: ITodo | undefined;
  loading: boolean;
  error: string;
}

interface ApiResponse {
  status: number;
  data: {
    todo: ITodo;
  };
}

export const useTodo = (): TodoHookProps => {
  const [todo, setTodo] = useState<ITodo | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleApiRequest = async (
    apiFunction: () => Promise<ApiResponse>,
    updateFunction: (todo: ITodo | undefined) => void,
    errorMessage: string
  ) => {
    setLoading(true);

    try {
      const { status, data } = await apiFunction();
      if (status !== 200 && status !== 201) {
        throw new Error(`Error! ${errorMessage}`);
      }
      updateFunction(data.todo);
      setError("");
    } catch (err) {
      setError((err as Error).message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault();
    handleApiRequest(() => addTodo(formData), setTodo, "Todo not saved");
  };

  const handleDeleteTodo = (id: string) => {
    handleApiRequest(() => deleteTodo(id), setTodo, "Todo not deleted");
  };

  const handleUpdateTodo = (todo: ITodo) => {
    const newTodo = {
      ...todo,
      status: true,
    };
    handleApiRequest(() => updateTodo(newTodo), setTodo, "Todo not updated");
  };

  const value = useMemo(
    () => ({
      handleSaveTodo,
      handleDeleteTodo,
      handleUpdateTodo,
      todo,
      loading,
      error,
    }),
    [todo, handleSaveTodo, handleDeleteTodo, handleUpdateTodo, loading, error]
  );

  return value;
};
