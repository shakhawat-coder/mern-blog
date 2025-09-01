const express = require("express");
const {
  createHighlightBlog,
  getHighlightBlog,
  updateHighlightBanner,
} = require("../../../contoller/homepage/highlight.controller");

const _ = express.Router();

_.route("/highlight").post(createHighlightBlog).get(getHighlightBlog);
_.route("/highlight/:id").patch(updateHighlightBanner);

module.exports = _;
