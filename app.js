require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const indexMiddleware = require("./middlewares/index");
const usersMiddleware = require("./middlewares/users/index");
const sneakersMiddleware = require("./middlewares/sneakers/index");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexMiddleware);
app.use("/users", usersMiddleware);
app.use("/sneakers", sneakersMiddleware);

app.use((err, req, res) => {
  // res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send({
    error: err,
  });
});

module.exports = app;
