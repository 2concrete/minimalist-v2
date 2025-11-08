"use client";
import { TodoProvider } from "./hooks/TodoProvider";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Logo from "./components/Logo";

const App = () => {
  return (
    <div className="w-lg mx-auto mt-16">
      <TodoProvider>
        <TodoInput />
        <TodoList />
      </TodoProvider>
      <Logo />
    </div>
  );
};

export default App;
