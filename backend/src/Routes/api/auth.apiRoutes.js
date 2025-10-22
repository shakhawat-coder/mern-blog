const express = require("express");
const {
  registration,
  login,
  getLoggedInUser,
  getSingleUser,
} = require("../../contoller/auth.controller");
const {authGuard ,adminGuard} = require("../../middleware/authGuard.middlaware");
const _ = express.Router();

_.route("/register").post(registration);
_.route("/userinfo/:id").get(getSingleUser);
_.route("/login").post(login);
_.route("/me").get(authGuard, getLoggedInUser);
_.route("/admin/me").get(adminGuard,getLoggedInUser)
module.exports = _;
