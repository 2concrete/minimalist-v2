import { useContext, useState } from "react";
import { TodoContext } from "../../hooks/TodoContext";
import { AnimatePresence, motion } from "framer-motion";

type TodoItem = {
  title: string;
  completed: boolean;
  uuid: number;
};

type TodoItemProps = {
  todo: TodoItem;
};

const LocalTodoItem = ({ todo }: TodoItemProps) => {
  const Context = useContext(TodoContext);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const deleteTodo = Context?.deleteTodo;

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
            onClick={() => deleteTodo && deleteTodo(todo.uuid)}
            className="cursor-pointer opacity-90"
          >
            delete
          </motion.button>
        )}

        <p className={`transition-all cursor-pointer`}>{todo.title}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocalTodoItem;
