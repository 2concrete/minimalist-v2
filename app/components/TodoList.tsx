import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TodoItem from "./TodoItem";
import { Id } from "@/convex/_generated/dataModel";

type TodoItem = {
  title: string;
  completed: boolean;
  _id: Id<"todos">;
  _creationTime: number;
};

const TodoList = () => {
  const todos = useQuery(api.todos.get);

  return (
    <div className="flex flex-col-reverse">
      {todos?.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
