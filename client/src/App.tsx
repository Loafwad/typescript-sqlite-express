import React, { useEffect, useState } from "react";
import { TodoForm } from "./components/AddTodo.tsx";
import TodoItem from "./components/TodoItem.tsx";
import { ITodo } from "./types";
import { useTodos } from "./hooks/todos.ts";

const App: React.FC = () => {
  const {
    fetchTodos,
    handleSaveTodo,
    handleDeleteTodo,
    handleUpdateTodo,
    todos,
  } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

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
