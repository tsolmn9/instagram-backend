const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    proImg: { type: String },
    posts: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
