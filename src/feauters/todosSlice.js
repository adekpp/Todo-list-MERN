import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/user.service";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await UserService.getTodos();
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await UserService.createTodo({ title: todo });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await UserService.deleteTodo(id);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const response = await UserService.updateTodo(updatedTodo);
    return response.data;
  }
);

export const updateCompleted = createAsyncThunk(
  "todos/updateCompleted",
  async (updatedTodo) => {
    const response = await UserService.updateCompleted(updatedTodo);
    return response.data;
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [addTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [addTodo.fulfilled]: (state, action) => {
      state.loading = false;
      const newTodo = action.payload.newTodo;
      state.todos.unshift(newTodo);
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
      const newTodos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
      state.todos = newTodos;
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
      const updatedTodo = action.payload;
      const newTodos = state.todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          return updatedTodo;
        }
        return todo;
      });
      state.todos = newTodos;
    },
    [updateTodo.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [updateCompleted.fulfilled]: (state, action) => {
      state.loading = false;
      const updatedTodo = action.payload;
      const newTodos = state.todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          return updatedTodo;
        }
        return todo;
      });
      state.todos = newTodos;
    },
  },
});

export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
