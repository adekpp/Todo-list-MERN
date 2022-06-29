import { getTodos } from "./feauters/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import { TodoList } from "./components/todolist/TodoList";
import { AddTodo } from "./components/addTodo/AddTodo";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.token) {
      navigate("/");
    } else {
      dispatch(getTodos());
    }
  }, [dispatch, user, navigate]);

  return (
    <div className="App w-full h-screen bg-gradient-to-r from-[#809bae] to-[#bed7e2] ">
      <Navbar />
      <div className="flex w-full place-content-center">
        <div className="flex flex-col flex-grow bg-[#d8dccc] p-3 rounded-sm max-w-[500px] mt-4">
          <h1 className="text-2xl text-center mb-3">What's to do?</h1>
          <AddTodo />
          {todos.length === 0 && <p className="text-center">List is empty!</p>}
          {todos && <TodoList />}
        </div>
      </div>
    </div>
  );
}

export default Home;
