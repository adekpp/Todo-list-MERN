const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todos");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const checkAuth = require("./middlewares/checkAuth");
require("dotenv").config();

const app = express();

//middleware
app.use(
  cors()
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.method, req.url, res.statusCode);
  next();
});

//routes
app.use("/auth", authRoutes);
app.use("/todos", checkAuth, todosRoutes);

//connect to mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err.message);
  });
