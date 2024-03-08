import { useMemo, useState } from "react";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../api/todo.ts";
import { ITodo } from "../types";

type TodosContextType = {
  fetchTodos: () => void;
  handleSaveTodo: (e: React.FormEvent, formData: ITodo) => void;
  handleDeleteTodo: (id: string) => void;
  handleUpdateTodo: (todo: ITodo) => void;
  todos: ITodo[];
};

export const useTodos = (): TodosContextType => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = () => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo) => {
    const newTodo = {
      ...todo,
      status: true,
    };

    updateTodo(newTodo).then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error! Todo not updated");
      }
      setTodos(data.todos);
    });
  };

  const value = useMemo(
    () => ({
      fetchTodos,
      handleSaveTodo,
      handleDeleteTodo,
      handleUpdateTodo,
      todos,
    }),
    [todos, fetchTodos, handleSaveTodo, handleDeleteTodo, handleUpdateTodo]
  );

  return value;
};
