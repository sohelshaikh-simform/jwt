const express = require("express");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const ejs = require("ejs");
const userRouter = require("./route/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet=require('helmet')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(helmet())
app.use(
  session({
    secret: process.env.Secretsessoin,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
  })
);

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

mongoose
  .connect("mongodb://localhost:27017/shdummy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("sucess"))
  .catch((err) => console.log(err));
app.listen(5000, () => {
  console.log("app is running on port 6000");
});
