const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "Junior Journalist",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    socialLinks: {
      type: Map,
      of: String,
      default: {},
    },
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
module.exports = mongoose.model("user", userSchema);
