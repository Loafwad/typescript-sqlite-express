import { useTodo } from "../hooks/useTodo";
import { ITodo } from "../types";

type Props = {
  todo: ITodo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, name, description, status } = todo;

  const { handleUpdateTodo, handleDeleteTodo } = useTodo();

  return (
    <div className="card" key={id}>
      <div className="flex gap-2">
        <input type="radio" checked={status} readOnly />
        <div>
          <h1 className="fs-4">{name}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-row my-auto ">
        <button
          onClick={() => handleUpdateTodo?.(todo)}
          className="btn btn-primary h-50 "
        >
          Complete
        </button>
        <button
          onClick={() => handleDeleteTodo?.(id)}
          className="btn btn-warning  h-50 "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
