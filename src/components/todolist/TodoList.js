import React from "react";
import { SingleTodo } from "../todo/SingleTodo";
import { useSelector } from "react-redux";
export const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <ul className="flex flex-col gap-2 w-full">
      {todos && todos.map((todo) => <SingleTodo key={todo._id} todo={todo} />)}
    </ul>
  );
};
