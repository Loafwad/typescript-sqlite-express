import axios, { AxiosResponse } from "axios";
import { ITodo } from "../types";
import { useState } from "react";

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
  data: ITodo
): Promise<AxiosResponse<DataType>> => {
  try {
    const todo: Omit<ITodo, "id"> = {
      name: data.name,
      description: data.description,
      status: false,
    };

    const saveTodo = await axios.post<DataType>(baseURL + "/add-todo", todo);
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (
  data: ITodo
): Promise<AxiosResponse<DataType>> => {
  try {
    const todo: Pick<ITodo, "name" | "description" | "status"> = {
      name: data.name,
      description: data.description,
      status: data.status,
    };
    const updatedTodo = await axios.put<DataType>(
      baseURL + `/update-todo/${data.id}`,
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
