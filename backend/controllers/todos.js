const Todos = require("../models/todosModel");

const getAlltodos = async (req, res) => {
  try {
    const todos = await Todos.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
};

const getSingleTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todos.findById(id);
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
};

const postNewTodo = async (req, res) => {
  const newTodo = new Todos(req.body);
  try {
    await newTodo.save();
    res.json({ message: "New todo added" });
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    await Todos.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.json({ message: err });
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  try {
    await Todos.findByIdAndUpdate(id, updatedTodo);
    res.json({ message: "Todo updated" });
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getAlltodos,
  getSingleTodo,
  postNewTodo,
  deleteTodo,
  updateTodo,
};
