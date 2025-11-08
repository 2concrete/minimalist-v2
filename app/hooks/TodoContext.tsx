"use client";
import { createContext } from "react";

type TodoItem = {
  title: string;
  completed: boolean;
  uuid: number;
};

type ContextType = {
  todos: TodoItem[];
  addTodo: (title: string) => void;
  toggleTodo: (uuid: number) => void;
  deleteTodo: (uuid: number) => void;
};

export const TodoContext = createContext<ContextType | null>(null);
