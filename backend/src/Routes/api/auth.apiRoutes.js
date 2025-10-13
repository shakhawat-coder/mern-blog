const express = require("express");
const {
  registration,
  login,
  getLoggedInUser,
} = require("../../contoller/auth.controller");
const authGuard = require("../../middleware/authGuard.middlaware");
const _ = express.Router();

_.route("/register").post(registration);
_.route("/login").post(login);
_.route("/me").get(authGuard, getLoggedInUser);
module.exports = _;
