"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "motion/react";
import { useState, useContext } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { TodoContext } from "../hooks/TodoContext";
import posthog from "posthog-js";

type TodoInputProps = {
  isAuthenticated: boolean;
};

const TodoInput = ({ isAuthenticated }: TodoInputProps) => {
  const [title, setTitle] = useState<string>("");
  const addTodoDb = useMutation(api.todos.addTodo);
  const Context = useContext(TodoContext);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAuthenticated) {
      addTodoDb({ title: title });
    } else if (Context?.addTodo) {
      Context.addTodo(title);
    }

    posthog.capture("submit");

    setTitle("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex mb-8 h-6"
    >
      <form
        className="flex items-start justify-between w-full"
        onSubmit={handleSubmit}
      >
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="enter todo..."
          className="outline-none border-neutral-600 w-full"
        />
        {title && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button className="cursor-pointer">
              <HiOutlineChevronRight className="size-5 stroke-1 relative top-1" />
            </button>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TodoInput;
