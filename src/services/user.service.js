import axios from "axios";
import authHeader from "./auth.header";

const API_URL = process.env.REACT_APP_API;

const getTodos = () => {
  return axios.get(`${API_URL}/todos`, { headers: authHeader() });
};

const getTodo = (id) => {
  return axios.get(`${API_URL}/todos` + id, { headers: authHeader() });
};

const createTodo = (todo) => {
  return axios.post(`${API_URL}/todos`, todo, { headers: authHeader() });
};

const updateTodo = (updatedTodo) => {
  const { id, title, completed } = updatedTodo;
  return axios.patch(
    `${API_URL}/todos/` + id,
    { title: title, completed: completed },
    { headers: authHeader() }
  );
};

const updateCompleted = (updatedTodo) => {
  const { id, title, completed } = updatedTodo;
  return axios.patch(
    `${API_URL}/todos/` + id,
    { title: title, completed: completed },
    { headers: authHeader() }
  );
};

const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/todos/` + id, { headers: authHeader() });
};

const UserService = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  updateCompleted,
};
export default UserService;
