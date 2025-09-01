const express = require("express");
const cors = require("cors");
const app = express();
const AllRoutes = require("./Routes/index.js");
// const cookieParser = require("cookie-parser");
// using middleware
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.static("./public/temp"));
app.use(AllRoutes);

module.exports = app;
