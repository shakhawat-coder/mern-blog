const express = require("express");
const { registration } = require("../../contoller/auth.controller");
const _ = express.Router();

_.route("/register").post(registration);

module.exports = _;
