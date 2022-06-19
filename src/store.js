import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./feauters/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
