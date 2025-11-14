"use client";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

export const MigrationHandler = () => {
  const { isSignedIn } = useAuth();
  const migrateTodos = useMutation(api.todos.migrateTodos);

  useEffect(() => {
    // Only run on client side when user is signed in
    if (isSignedIn && typeof window !== "undefined") {
      const todosString = localStorage.getItem("todos");

      if (todosString) {
        try {
          const localTodos = JSON.parse(todosString);

          if (Array.isArray(localTodos) && localTodos.length > 0) {
            // Remove uuid field from each todo
            const todosWithoutUuid = localTodos.map(
              ({ uuid, ...todo }) => todo
            );

            migrateTodos({ todos: todosWithoutUuid }).then(() =>
              localStorage.removeItem("todos")
            );
          }
        } catch (error) {
          console.error("Failed to migrate todos:", error);
        }
      }
    }
  }, [isSignedIn, migrateTodos]);

  // This component doesn't render anything
  return null;
};
