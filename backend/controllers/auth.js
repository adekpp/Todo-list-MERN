const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db, addListener } = require("../models/Todo");

const register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user != null) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return res.status(400).json({
        message: "Username must be between 3 and 20 characters",
      });
    }
    if (req.body.password.length < 4) {
      return res.status(400).json({
        message: "Password must be at least 4 characters",
      });
    }

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const user = new User({
        username: req.body.username,
        password: hash,
      });

      await db.collection("users").insertOne(user, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const payload = {
            id: user._id,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({
            username: user.username,
            id: user._id,
            token,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      username: user.username,
      id: user._id,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json({
    message: "Logged out successfully",
  });
};

module.exports = {
  register,
  login,
  logout,
};
