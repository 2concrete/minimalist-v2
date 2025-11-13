import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodoContext } from "../hooks/TodoContext";

type TodoListProps = {
  isAuthenticated: boolean;
};

const TodoList = ({ isAuthenticated }: TodoListProps) => {
  const todosDb = useQuery(api.todos.get);
  const Context = useContext(TodoContext);
  const todosLocal = Context?.todos;

  const todos = isAuthenticated ? todosDb : todosLocal;

  if (!todos) return null;

  return (
    <div className="flex flex-col-reverse">
      {[...todos]?.map((todo) => {
        const key = "_id" in todo ? todo._id : todo.uuid;

        return (
          <TodoItem key={key} todo={todo} isAuthenticated={isAuthenticated} />
        );
      })}
    </div>
  );
};

export default TodoList;
