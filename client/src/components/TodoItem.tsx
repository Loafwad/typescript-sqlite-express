import React, { CSSProperties } from "react";
import { ITodo } from "../types";
import { Button } from "./atoms/Button.tsx";

type Props = {
  todo: ITodo;
  updateTodo?: (todo: ITodo) => void;
  deleteTodo?: (id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  // A very specific style for the todo item.
  const containerStyle: CSSProperties = {
    backgroundColor: "hsl(0, 0%, 16%)",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: "24px",
    marginTop: "12px",
  };

  return (
    <div style={containerStyle} key={todo.id}>
      <div className="flex gap-1">
        <input type="radio" checked={todo.status} readOnly />
        <div>
          <h1>{todo.name}</h1>
          <span>{todo.description}</span>
        </div>
      </div>
      <div className="flex gap-1">
        <Button onClick={() => updateTodo?.(todo)} class="btn btn-primary">
          Complete
        </Button>
        <Button onClick={() => deleteTodo?.(todo.id)} class="btn btn-warning">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
