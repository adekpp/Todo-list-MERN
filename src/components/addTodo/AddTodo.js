import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, addTodo } from "../../feauters/todosSlice";
import CircularProgress from "@mui/material/CircularProgress";
export const AddTodo = () => {
  const [todoValue, setTodoValue] = useState("");
  const dispatch = useDispatch();
  const { loadingTodos } = useSelector((state) => state.todos);
  const handleAddTodo = (e) => {
    e.preventDefault();
    const todo = {
      title: todoValue,
    };
    dispatch(addTodo(todo)).then(() => {
      dispatch(getTodos()).then(() => {
        dispatch(getTodos());
      });
      setTodoValue("");
    });
  };

  return (
    <form className="flex flex-row bg-sky-500 w-full  px-3 py-2 shadow-md text-white mb-2 gap-3">
      <input
        className=" bg-sky-600 border-none outline-none font-semibold tracking-wider px-1"
        type="text"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      {loadingTodos ? (
        <CircularProgress size={"16px"} style={{ color: "white" }} />
      ) : (
        <button className="font-semibold" onClick={handleAddTodo} type="submit">
          Add
        </button>
      )}
    </form>
  );
};
