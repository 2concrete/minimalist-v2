"use client";
import TodoInput from "./components/Authenticated/TodoInput";
import TodoList from "./components/Authenticated/TodoList";
import Logo from "./components/Logo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { useAuth } from "@clerk/nextjs";
import LocalTodoInput from "./components/Unauthenticated/LocalTodoInput";
import LocalTodoList from "./components/Unauthenticated/LocalTodoList";
import { TodoProvider } from "./hooks/TodoProvider";

const App = () => {
  const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string
  );

  return (
    <div className="w-lg mx-auto mt-16 font-[Inter]">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>
          <TodoInput />
          <TodoList />
        </Authenticated>
        <Unauthenticated>
          <TodoProvider>
            <LocalTodoInput />
            <LocalTodoList />
          </TodoProvider>
        </Unauthenticated>
      </ConvexProviderWithClerk>
      <Logo />
    </div>
  );
};

export default App;
