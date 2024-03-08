import { Response, Request } from "express";
import { ITodo, TodoModel } from "../models/todo";
import { v4 } from "uuid";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoModel.find();

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Todos" });
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description">;

    const uuid = v4();
    await TodoModel.save({
      id: uuid.toString(),
      name: body.name,
      description: body.description,
      status: false,
      createdAt: new Date().toISOString(),
    });
    const todos: ITodo[] = await TodoModel.find();
    res.status(201).json({ message: "Todo added", todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to add Todo " });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await TodoModel.update({
      id: id,
      description: body.description,
      name: body.name,
      status: body.status,
    });
    const allTodos: ITodo[] = await TodoModel.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await TodoModel.delete(req.params.id);
    const allTodos: ITodo[] = await TodoModel.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
