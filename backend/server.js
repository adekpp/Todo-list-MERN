const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todos");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.method, req.url, res.statusCode);
  next();
});

//routes
app.use("/todos", todosRoutes);

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
