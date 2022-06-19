import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API =
  process.env.REACT_APP_API

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await axios.get(API);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const { id, title } = updatedTodo;
    const response = await axios.patch(`${API}/${id}`, { title: title });
    return response.data;
  }
);

export const toggleCompleted = createAsyncThunk(
  "todos/toggleCompleted",
  async (updatedTodo) => {
    const { id, completed } = updatedTodo;
    const response = await axios.patch(`${API}/${id}`, {
      completed: completed,
    });
    return response.data;
  }
);

const initialState = {
  todos: [],
  loadingTodos: false,
  error: null,
  loading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.loadingTodos = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loadingTodos = false;
      state.todos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.error = action.error;
      state.loadingTodos = false;
    },
    [addTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [addTodo.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addTodo.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [deleteTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteTodo.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateTodo.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [toggleCompleted.pending]: (state, action) => {
      state.loading = true;
    },
    [toggleCompleted.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [toggleCompleted.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default todosSlice.reducer;
