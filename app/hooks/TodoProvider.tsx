"use client";
import { useEffect, useState, type ReactNode } from "react";
import { TodoContext } from "./TodoContext";

type TodoItem = {
  title: string;
  completed: boolean;
  uuid: number;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      Promise.resolve().then(() => setTodos(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = {
      title: title,
      completed: false,
      uuid: Date.now(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (uuid: number) =>
    setTodos(
      todos.map((todo) =>
        todo.uuid === uuid ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const deleteTodo = (uuid: number) =>
    setTodos(todos.filter((todo) => todo.uuid !== uuid));

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
