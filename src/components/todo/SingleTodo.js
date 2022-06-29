import React, { useState, useRef, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  updateTodo,
  updateCompleted,
} from "../../feauters/todosSlice";


export const SingleTodo = ({ todo }) => {
  const [editTodo, setEditTodo] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.title);
  const inputRef = useRef();

  useEffect(() => {
    if (editTodo) {
      inputRef.current.focus();
    }
  }, [editTodo]);

  const dispatch = useDispatch();

  const handleDeleteTodo = (e) => {
    e.preventDefault();
    dispatch(deleteTodo(todo._id));
  };

  const handleUpdateTodo = () => {
    if (todoValue.length > 0 && todoValue.length <= 15) {
      const updatedTodo = {
        id: todo._id,
        title: todoValue,
        completed: todo.completed,
      };
      dispatch(updateTodo(updatedTodo));
      setEditTodo(false);
    }
  };

  const handleTodoCompleted = (e) => {
    if (editTodo) {
      return;
    }
    const updatedTodo = {
      id: todo._id,
      title: todo.title,
      completed: todo.completed ? false : true,
    };
    dispatch(updateCompleted(updatedTodo));
  };
  return (
    <li
      className={`flex flex-row ${
        todo.completed ? "bg-gray-400" : "bg-[#f7ab17]"
      } w-full justify-between px-3 py-2 shadow-md text-white`}
    >
    
        {editTodo ? (
          <div className="flex flex-row">
            <input
              ref={inputRef}
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              type="text"
              className={`w-full ${
                todo.completed ? "bg-gray-500" : "bg-[#cd8f14]"
              } border-none outline-none font-semibold tracking-wider pl-1 mr-2`}
            />
            <p>({15 - todoValue.length})</p>
            <CloseIcon
              className="cursor-pointer text-red-500 hover:scale-125 active:scale-95 mx-2"
              onClick={() => setEditTodo(false)}
            />
          </div>
        ) : (
          <div
          onClick={(e) => handleTodoCompleted(e)}
          className="flex flex-row flex-wrap w-full cursor-pointer border-r-2 mr-4"
        >
          <p
            className={`font-semibold ${
              todo.completed && "text-gray-500 line-through"
            } `}
          >
            {todo.title}
          </p>
          </div>
         
        )}
      
      <div className="flex gap-2">
        {editTodo ? (
          <CheckIcon
            className="cursor-pointer text-green-400 hover:scale-125 active:scale-95"
            onClick={handleUpdateTodo}
          />
        ) : (
          <EditIcon
            className="cursor-pointer hover:scale-125 active:scale-95"
            onClick={() => setEditTodo(true)}
          />
        )}
        <DeleteIcon
          className="cursor-pointer text-red-500 hover:scale-125 active:scale-95"
          onClick={handleDeleteTodo}
        />
      </div>
    </li>
  );
};
