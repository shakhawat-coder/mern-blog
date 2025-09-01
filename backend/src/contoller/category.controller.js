const categoryModel = require("../Model/category.model");
const {
  uploadCloudinaryFile,
  deleteCloudinaryFile,
} = require("../../../../ecommerce/backend/Src/Utils/cloudinary");
const { apiError } = require("../utils/ApiError");
const { apiResponse } = require("../utils/ApiResponse");
// ===============create category==================
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file;
    if (!name || !description || !image) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const uploadFile = await uploadCloudinaryFile(image?.path);
    if (!uploadFile || !uploadFile.secure_url) {
      return res
        .status(500)
        .json(new apiError(false, null, "Error uploading image", true));
    }
    console.log("Uploaded Images:", uploadFile.secure_url);

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(409)
        .json(new apiError(false, null, "Category already exists", true));
    }
    const newCategory = await categoryModel.create({
      name,
      description,
      image: uploadFile.secure_url,
      ...req.body,
    });
    if (newCategory) {
      return res
        .status(201)
        .json(
          new apiResponse(
            true,
            newCategory,
            "Category created successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error creating category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===================get all category==================
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({}).populate("blogs");
    // console.log("Fetched all categories blogs:", allCategories.blogs);

    if (allCategories.length === 0) {
      return res
        .status(404)
        .json(new apiError(false, null, "No categories found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(true, allCategories, "All categories fetched", false)
        );
    }
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ======================get single category==================
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const singleCategory = await categoryModel.findById(id).populate("blogs");
    if (!singleCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Category not found", true));
    } else {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            singleCategory,
            "Single category fetched successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error fetching single category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ===================update category==================
const updateCategory = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const existingCategory = await categoryModel.findById(productId);
    if (!existingCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Category not found", true));
    }
    if (req.file) {
      const detale_resourcesCloudinary = await deleteCloudinaryFile(
        existingCategory.image
      );
      if (detale_resourcesCloudinary) {
        console.log("Deleted old image from Cloudinary");
      }
    }
    let uploadFile = null;
    if (req.file) {
      uploadFile = await uploadCloudinaryFile(req.file?.path);
      if (uploadFile) {
        console.log("Uploaded new image to Cloudinary:", uploadFile.secure_url);
      }
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      { _id: productId },
      {
        ...req.body,
        image: uploadFile ? uploadFile.secure_url : existingCategory.image,
      },
      { new: true }
    );
    if (updatedCategory) {
      return res
        .status(200)
        .json(
          new apiResponse(
            true,
            updatedCategory,
            "Category updated successfully",
            false
          )
        );
    }
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===================delete category==================
const deleteCategory = async (req, res) => {
  try {
    // console.log("Deleting category with ID:", req.params);

    const { id: categoryId } = req.params;
    console.log("Deleting category with ID:", categoryId);

    const deletedCategory = await categoryModel.findById(categoryId);

    if (!deletedCategory) {
      return res
        .status(404)
        .json(new apiError(false, null, "Category not found", true));
    }
    if (deletedCategory.image) {
      const cloudinaryFilePath = deletedCategory.image;
      const delete_resourcesCloudinary = await deleteCloudinaryFile(
        cloudinaryFilePath
      );
      if (delete_resourcesCloudinary) {
        console.error(
          "Deleted image from Cloudinary:",
          delete_resourcesCloudinary
        );
      } // Log the deletion status
    }
    await categoryModel.findByIdAndDelete(categoryId);
    return res
      .status(200)
      .json(
        new apiResponse(true, null, "Category deleted successfully", false)
      );
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
