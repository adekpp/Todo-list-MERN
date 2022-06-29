import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../feauters/todosSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export const AddTodo = () => {
  const [todoValue, setTodoValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);
  const inputRef = useRef();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoValue.length > 0 && todoValue.length <= 15) {
      dispatch(addTodo(todoValue));
      setTodoValue("");
      inputRef.current.focus();
    }
  };

  return (
    <form 
    onSubmit={handleAddTodo}
    className="flex flex-row bg-[#f7ab17] w-full  px-3 py-2 shadow-md text-white mb-2 gap-3">
      <input
        className=" bg-[#cd8f14] border-none outline-none font-semibold tracking-wider px-1 "
        ref={inputRef}
        type="text"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <div className="flex flex-row gap-3">
        <Button
          className="active:scale-90"
          disabled={loading}
          size="small"
          type="submit"
          sx={{
            backgroundColor: "#3f2e26",
            color: "white",
            "&:hover": {
              backgroundColor: "#3f2e26",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              size={20}
              sx={{
                color: "white",
              }}
            />
          ) : (
            "Add"
          )}
        </Button>
        <p>({15 - todoValue.length})</p>
      </div>
    </form>
  );
};
