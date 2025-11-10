import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type TodoItemProps = {
  todo: {
    title: string;
    completed: boolean;
    _id: Id<"todos">;
    _creationTime: number;
  };
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex gap-1 w-fit"
      >
        {isHovering && (
          <motion.button
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            exit={{ x: -20 }}
            onClick={() => deleteTodo({ id: todo._id })}
            className="cursor-pointer opacity-90"
          >
            delete
          </motion.button>
        )}
        <p
          onClick={() => toggleTodo({ id: todo._id })}
          className={` transition-all cursor-pointer`}
        >
          {todo.title}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoItem;
