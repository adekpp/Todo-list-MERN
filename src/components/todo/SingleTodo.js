import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  getTodos,
  deleteTodo,
  updateTodo,
  toggleCompleted,
} from "../../feauters/todosSlice";

export const SingleTodo = ({ todo }) => {
  const [editTodo, setEditTodo] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.title);

  const dispatch = useDispatch();

  const handleDeleteTodo = (e) => {
    e.preventDefault();
    dispatch(deleteTodo(todo._id)).then(() => {
      dispatch(getTodos());
    });
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    const updatedTodo = {
      id: todo._id,
      title: todoValue,
    };

    dispatch(updateTodo(updatedTodo)).then(() => {
      dispatch(getTodos());
    });
    setEditTodo(false);
  };

  const handleToggleCompleted = () => {
    const updatedTodo = {
      id: todo._id,
      completed: todo.completed ? false : true,
    };

    dispatch(toggleCompleted(updatedTodo)).then(() => {
      dispatch(getTodos());
    });
  };

  return (
    <li className="flex flex-row bg-sky-500 w-full justify-between px-3 py-2 shadow-md text-white">
      <div>
        {editTodo ? (
          <div className="flex flex-row">
            <input
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              type="text"
              className="w-full bg-sky-600 border-none outline-none font-semibold tracking-wider"
            />
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setEditTodo(false)}
            />
          </div>
        ) : (
          <p
            onClick={handleToggleCompleted}
            className={`font-semibold ${todo.completed && `line-through`}`}
          >
            {todo.title}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {editTodo ? (
          <CheckIcon className="cursor-pointer" onClick={handleUpdateTodo} />
        ) : (
          <EditIcon
            className="cursor-pointer"
            onClick={() => setEditTodo(true)}
          />
        )}
        <DeleteIcon className="cursor-pointer" onClick={handleDeleteTodo} />
      </div>
    </li>
  );
};
