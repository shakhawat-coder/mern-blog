const { getPublicIdFromUrl } = require("../helper/cloudinaryPublicId");
const blogModel = require("../Model/blog.model");
const categoryModel = require("../Model/category.model");
const { apiError } = require("../utils/ApiError");
const { apiResponse } = require("../utils/ApiResponse");
const {
  uploadCloudinaryFile,
  deleteCloudinaryFile,
} = require("../utils/cloudinary");

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const images = req.files?.image; // This will be an array of files
    if (!title || !description || !images) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    // const allImage = req.files?.image;
    let allUploadImage = [];
    for (let image of images) {
      let uploadFile = await uploadCloudinaryFile(image?.path, "BlogImages"); // "BlogImages" is your folder name
      allUploadImage.push(uploadFile.secure_url);
    }
    console.log("Uploaded Images:", allUploadImage);

    const existingBlog = await blogModel.findOne({ title });
    if (existingBlog) {
      return res
        .status(409)
        .json(new apiError(false, null, "Blog already exists", true));
    }
    const newBlog = await blogModel.create({
      title,
      description,
      image: allUploadImage,
      category: req.body.category,
      ...req.body,
    });
    await categoryModel.findByIdAndUpdate(
      req.body.category,
      { $push: { blogs: newBlog._id } },
      { new: true }
    );
    return res.status(201).json({
      apiResponse: true,
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =================get all blogs ==============
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel.find({}).populate("category");
    if (!allBlogs || allBlogs.length === 0) {
      return res
        .status(404)
        .json(new apiError(false, null, "No blogs found", true));
    }
    return res.status(200).json({
      apiResponse: true,
      success: true,
      message: "All blogs fetched successfully",
      data: allBlogs,
    });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =================get single blog ==============
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(new apiError(false, null, "Blog ID is required", true));
    }
    const blog = await blogModel.findById(id).populate("category");
    if (!blog) {
      return res
        .status(404)
        .json(new apiError(false, null, "Blog not found", true));
    }
    return res.status(200).json({
      apiResponse: true,
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =============edit blog ==============
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // const images = req.files?.image;
    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
      return res
        .status(404)
        .json(new apiError(false, null, "Blog not found", true));
    }
    const images = req.files?.image;
    if (images && images.length > 0) {
      // Delete all old images from Cloudinary
      for (const url of existingBlog.image) {
        const publicId = getPublicIdFromUrl(url);
        await deleteCloudinaryFile(publicId);
      }
    }
    let allUploadImage = [];
    // const images = req.files?.image; // This will be an array of files
    if (!images || images.length === 0) {
      allUploadImage = existingBlog.image;
    } else {
      for (let image of images) {
        let uploadFile = await uploadCloudinaryFile(image?.path, "BlogImages");
        allUploadImage.push(uploadFile.secure_url);
      }
    }
    console.log("Uploaded Images:", allUploadImage);
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        image: allUploadImage,
        category: req.body.category,
      },
      { new: true }
    );
    if (updatedBlog) {
      await categoryModel.findByIdAndUpdate(
        req.body.category,
        { $push: { blogs: updatedBlog._id } },
        { new: true }
      );
      return res.status(200).json({
        apiResponse: true,
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    }
  } catch (error) {
    console.error("❌ Error editing blog:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// =================delete blog ==============
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
      return res
        .status(404)
        .json(new apiError(false, null, "Blog not found", true));
    }
    // Delete all images from Cloudinary
    for (const url of existingBlog.image) {
      const publicId = getPublicIdFromUrl(url);
      await deleteCloudinaryFile(publicId);
    }
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    if (deletedBlog) {
      return res.status(200).json({
        apiResponse: true,
        success: true,
        message: "Blog deleted successfully",
        data: deletedBlog,
      });
    }
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteBlog,
};
