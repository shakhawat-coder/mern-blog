const mongoose = require("mongoose");
const { Schema } = mongoose;

const highlightSchema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("highlight", highlightSchema);
