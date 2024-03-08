import axios, { AxiosResponse } from "axios";
import { ITodo } from "../types";

const baseURL: string = "http://localhost:4000";

type DataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todo: ITodo;
};

export const getTodos = async (): Promise<AxiosResponse<DataType>> => {
  try {
    const todos: AxiosResponse<DataType> = await axios.get(baseURL + "/todos");
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<DataType>> => {
  try {
    const todo: Omit<ITodo, "id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };

    const saveTodo = await axios.post<DataType>(baseURL + "/add-todo", todo);
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (
  formData: ITodo
): Promise<AxiosResponse<DataType>> => {
  try {
    const todo: Pick<ITodo, "name" | "description" | "status"> = {
      name: formData.name,
      description: formData.description,
      status: formData.status,
    };
    const updatedTodo = await axios.put<DataType>(
      baseURL + `/update-todo/${formData.id}`,
      todo
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (
  id: string
): Promise<AxiosResponse<DataType>> => {
  try {
    const deletedTodo: AxiosResponse<DataType> = await axios.delete(
      baseURL + `/delete-todo/${id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
