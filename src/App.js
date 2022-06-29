import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import {Login} from "./pages/Login/Login";
import {Register} from "./pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todos" element={<Home />} />
    </Routes>
  );
}

export default App;
