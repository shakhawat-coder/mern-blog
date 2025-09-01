const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteBlog,
} = require("../../contoller/blog.controller");
const { upload } = require("../../middleware/multer.middleware");
const _ = express.Router();

_.route("/blog")
  .post(upload.fields([{ name: "image", maxCount: 5 }]), createBlog)
  .get(getAllBlogs);

_.route("/blog/:id")
  .get(getSingleBlog)
  .put(upload.fields([{ name: "image", maxCount: 5 }]), editBlog)
  .delete(deleteBlog);

module.exports = _;
