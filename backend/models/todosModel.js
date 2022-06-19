const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoModelSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoModelSchema);
