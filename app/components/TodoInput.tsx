"use client";

import { useContext, useState } from "react";
import { TodoContext } from "../hooks/TodoContext";
import { motion } from "framer-motion";
import { HiOutlineChevronRight } from "react-icons/hi2";

const TodoInput = () => {
  const Context = useContext(TodoContext);
  const addTodo = Context?.addTodo;

  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addTodo) {
      addTodo(title);
    }
    setTitle("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
