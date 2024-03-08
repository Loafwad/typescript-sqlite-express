import React, { useEffect, useState } from "react";
import { TodoForm } from "./components/AddTodo.tsx";
import TodoItem from "./components/TodoItem.tsx";
import { getTodos, addTodo, deleteTodo, updateTodo } from "./api/todo.ts";
import { ITodo } from "./types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
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

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
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

  return (
    <main className="App">
      <h1>Todos</h1>
      <TodoForm saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={handleDeleteTodo}
          updateTodo={handleUpdateTodo}
        />
      ))}
    </main>
  );
};

export default App;
