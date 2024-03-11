import { TodoForm } from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import { ITodo } from "./types";
import { useTodo } from "./hooks/useTodo";
import { useTodos } from "./hooks/useTodos";

const App: React.FC = () => {
  const { todos, loading } = useTodos();

  return (
    <main className="App">
      <div className="flex flex-column gap-4">
        <div className="card flex-column ">
          <h1>Todos</h1>
          <TodoForm />
        </div>
        {loading && <h1>Loading...</h1>}
        {todos.map((todo: ITodo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </main>
  );
};

export default App;
