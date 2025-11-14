import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion, AnimatePresence } from "motion/react";
import { useState, useContext } from "react";
import { TodoContext } from "../hooks/TodoContext";
import posthog from "posthog-js";

type TodoItemProps = {
  todo: {
    title: string;
    completed: boolean;
    _id?: Id<"todos">;
    uuid?: number;
    _creationTime?: number;
  };
  isAuthenticated: boolean;
};

const TodoItem = ({ todo, isAuthenticated }: TodoItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const deleteTodoDb = useMutation(api.todos.deleteTodo);
  const toggleTodoDb = useMutation(api.todos.toggleTodo);

  const Context = useContext(TodoContext);

  const handleDelete = () => {
    if (isAuthenticated && todo._id) {
      deleteTodoDb({ id: todo._id });
    } else if (!isAuthenticated && todo.uuid && Context?.deleteTodo) {
      Context.deleteTodo(todo.uuid);
    }
    posthog.capture("test-event");
  };

  const handleToggle = () => {
    if (isAuthenticated && todo._id) {
      toggleTodoDb({ id: todo._id });
    } else if (!isAuthenticated && todo.uuid && Context?.toggleTodo) {
      Context.toggleTodo(todo.uuid);
    }
  };

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
            onClick={handleDelete}
            className="cursor-pointer opacity-90"
          >
            delete
          </motion.button>
        )}
        <p onClick={handleToggle} className="transition-all cursor-pointer">
          {todo.title}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoItem;
