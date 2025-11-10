import { useContext } from "react";
import { TodoContext } from "../../hooks/TodoContext";
import LocalTodoItem from "./LocalTodoItem";

const LocalTodoList = () => {
  const Context = useContext(TodoContext);

  const todos = Context?.todos;

  return (
    <div className="flex flex-col-reverse">
      {todos?.map((todo) => (
        <LocalTodoItem key={todo.uuid} todo={todo} />
      ))}
    </div>
  );
};

export default LocalTodoList;
