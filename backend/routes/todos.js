const express = require("express");
const router = express.Router();
const {
  getAlltodos,
  getSingleTodo,
  postNewTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todos");

router.route("/").get(getAlltodos).post(postNewTodo);
router.route("/:id").get(getSingleTodo).delete(deleteTodo).patch(updateTodo);

module.exports = router;
