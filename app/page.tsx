"use client";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Logo from "./components/Logo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { TodoProvider } from "./hooks/TodoProvider";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="lg:w-lg md:w-lg sm:w-lg w-xs mx-auto mt-16 font-[Inter]">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <TodoProvider>
          <TodoInput isAuthenticated={!!isSignedIn} />
          <TodoList isAuthenticated={!!isSignedIn} />
        </TodoProvider>
      </ConvexProviderWithClerk>
      <Logo />
    </div>
  );
};

export default App;
