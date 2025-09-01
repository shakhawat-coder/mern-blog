const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    title: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog", blogSchema);
