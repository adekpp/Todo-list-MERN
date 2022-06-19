import { getTodos } from "./feauters/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import { TodoList } from "./components/todolist/TodoList";
import { AddTodo } from "./components/addTodo/AddTodo";

function App() {
  const dispatch = useDispatch();

  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className="App w-full h-screen bg-gradient-to-r from-sky-600 to-sky-500">
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="bg-white p-3 rounded-sm md:w-[500px] ">
          <h1 className="text-2xl text-center mb-3">Todo List</h1>
          <AddTodo />
          {todos && <TodoList />}
        </div>
      </div>
    </div>
  );
}

export default App;
