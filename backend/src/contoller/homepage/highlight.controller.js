const highlightModel = require("../../Model/homepage/highlight.model");
const { apiError } = require("../../utils/ApiError");
const { apiResponse } = require("../../utils/ApiResponse");

// ==============create blanner=================
const createHighlightBlog = async (req, res) => {
  try {
    const { blog, slug } = req.body;

    if (!blog || !slug) {
      return res
        .status(400)
        .json(new apiError(false, null, "Blog ID and slug are required", true));
    }

    // Ensure slug is unique (only one banner/featured exists)
    const existingHighlight = await highlightModel.findOne({ slug });
    if (existingHighlight) {
      return res
        .status(409)
        .json(
          new apiError(
            false,
            null,
            `Highlight with slug '${slug}' already exists`,
            true
          )
        );
    }

    // Create new highlight
    const newHighlight = await highlightModel.create({ blog, slug });
    if (!newHighlight) {
      return res
        .status(500)
        .json(new apiError(false, null, "Error creating highlight", true));
    }

    return res
      .status(201)
      .json(
        new apiResponse(
          true,
          newHighlight,
          "Highlight created successfully",
          false
        )
      );
  } catch (error) {
    console.error("❌ Error creating highlight:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ===============get banner ===================
const getHighlightBlog = async (req, res) => {
  try {
    const allHighlightBlog = await highlightModel.find({}).populate({
      path: "blog", // populate blog inside banner
      populate: {
        path: "category", // populate category inside blog
        select: "name", // only required fields
      },
    });
    if (!allHighlightBlog || allHighlightBlog.length === 0) {
      return res
        .status(404)
        .json(new apiError(false, null, "No Highlight Blog found", true));
    }
    return res
      .status(200)
      .json(
        new apiResponse(true, allHighlightBlog, " All Highlight Blog", false)
      );
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

// ==============update banner ================
const updateHighlightBanner = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(new apiError(false, null, "Banner ID is required", true));
    }
    const existingBanner = await highlightModel.findById(id);
    if (existingBanner) {
      return res
        .status(404)
        .json(new apiError(false, null, "Banner already exists", true));
    }
    const updateBanner = await highlightModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updateBanner) {
      return res
        .status(401)
        .json(new apiError(false, null, "Banner not found", true));
    } else {
      return res
        .status(200)
        .json(new apiResponse(true, updateBanner, "Banner updated", false));
    }
  } catch (error) {
    console.error("❌ Error updating banner:", error);
    return res
      .status(500)
      .json(new apiError(false, null, "Internal server error", true));
  }
};

module.exports = {
  createHighlightBlog,
  getHighlightBlog,
  updateHighlightBanner,
};
