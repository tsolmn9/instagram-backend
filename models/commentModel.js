const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  comment: { type: String, required: true },
  postId: { type: mongoose.Types.ObjectId, ref: "posts" },
});

const commentsModel = mongoose.model("comments", commentSchema);

module.exports = commentsModel;
