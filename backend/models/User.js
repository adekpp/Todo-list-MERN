const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },

});

module.exports = mongoose.model("User", userSchema);
