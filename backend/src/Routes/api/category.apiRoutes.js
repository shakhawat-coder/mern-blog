const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../../contoller/category.controller");
const { upload } = require("../../middleware/multer.middleware");
const _ = express.Router();

_.route("/category")
  .post(upload.single("image"), createCategory)
  .get(getAllCategories);
_.route("/category/:id")
  .get(getSingleCategory)
  .put(upload.single("image"), updateCategory)
  .delete(deleteCategory);

module.exports = _;
