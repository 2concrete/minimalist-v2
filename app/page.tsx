"use client";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Logo from "./components/Logo";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const App = () => {
  const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string
  );

  return (
    <div className="w-lg mx-auto mt-16 font-[Inter]">
      <ConvexProvider client={convex}>
        <TodoInput />
        <TodoList />
      </ConvexProvider>
      <Logo />
    </div>
  );
};

export default App;
