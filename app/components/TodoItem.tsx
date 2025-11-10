import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "motion/react";

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
    <motion.li
      key={todo._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => toggleTodo({ id: todo._id })}
      className={`${
        todo.completed && "line-through"
      } ${!todo.completed && "decoration-gray-400"} hover:line-through transition-all cursor-pointer list-none`}
    >
      {todo.title}
    </motion.li>
  );
};

export default TodoItem;
