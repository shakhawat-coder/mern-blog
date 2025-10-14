const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
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
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("category", categorySchema);
