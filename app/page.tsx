"use client";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Logo from "./components/Logo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { TodoProvider } from "./hooks/TodoProvider";
import { MigrationHandler } from "./components/MigrationHandler";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const App = () => {
  return (
    <div className="lg:w-lg md:w-lg sm:w-lg w-xs mx-auto mt-16 font-[Inter]">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <TodoProvider>
          <MigrationHandler />
          <AuthContent />
        </TodoProvider>
      </ConvexProviderWithClerk>
      <Logo />
    </div>
  );
};

// Separate component that uses Convex hooks
const AuthContent = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <TodoInput isAuthenticated={!!isSignedIn} />
      <TodoList isAuthenticated={!!isSignedIn} />
      <AuthLoading>
        <p>loading</p>
      </AuthLoading>
    </>
  );
};

export default App;
