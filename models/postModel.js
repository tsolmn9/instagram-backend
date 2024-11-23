const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  caption: { type: String, required: true },
  postImg: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
  likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
