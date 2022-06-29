const mongoose = require("mongoose");
const Todos = require("../models/Todo");

const getAlltodos = async (req, res) => {
  try {
    const todos = await Todos.find({ createdBy: req.user.id }).sort({_id:-1})
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSingleTodo = async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  try {
    const todo = await Todos.findOne({ _id: id, createdBy: user });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const postNewTodo = async (req, res) => {
  const newTodo = new Todos(
    Object.assign({}, req.body, { createdBy: req.user.id })
  );

  try {
    await newTodo.save();
    res.json({ newTodo });
  } catch (err) {
    res.json({ message: err });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const user = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid id",
    });
  }
  const todo = await Todos.findOneAndDelete({ _id: id, createdBy: user });
  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const user = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID" });
  }
  const todo = await Todos.findOneAndUpdate(
    { _id: id, createdBy: user },
    req.body,
    {
      new: true,
    }
  );
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
};

module.exports = {
  getAlltodos,
  getSingleTodo,
  postNewTodo,
  deleteTodo,
  updateTodo,
};
