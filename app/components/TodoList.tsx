import { useContext } from "react";
import { TodoContext } from "../hooks/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const Context = useContext(TodoContext);
  const todos = Context?.todos;

  return (
    <div className="flex flex-col-reverse">
      {todos?.map((todo) => (
        <TodoItem key={todo.uuid} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
