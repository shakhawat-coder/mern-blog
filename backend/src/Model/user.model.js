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
      enum: [ "author", "admin"],
      default: "author",
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1740252117044-2af197eea287?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480",
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
