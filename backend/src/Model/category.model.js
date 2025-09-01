const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "blog",
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
