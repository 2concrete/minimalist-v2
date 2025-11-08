import { useContext } from "react";
import { TodoContext } from "../hooks/TodoContext";
import { motion } from "framer-motion";

type TodoItem = {
  title: string;
  completed: boolean;
  uuid: number;
};

type TodoItemProps = {
  todo: TodoItem;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const Context = useContext(TodoContext);
  const deleteTodo = Context?.deleteTodo;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => deleteTodo && deleteTodo(todo.uuid)}
      className={`${
        todo.completed && "line-through"
      } hover:line-through transition-all cursor-pointer`}
    >
      {todo.title}
    </motion.div>
  );
};

export default TodoItem;
