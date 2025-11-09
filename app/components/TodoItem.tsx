import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type TodoItemProps = {
  todo: {
    title: string;
    completed: boolean;
    _id: Id<"todos">;
    _creationTime: number;
  };
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => toggleTodo({ id: todo._id })}
      className={`${
        !todo.completed && "line-through"
      } hover:line-through transition-all cursor-pointer`}
    >
      {todo.title}
    </motion.div>
  );
};

export default TodoItem;
