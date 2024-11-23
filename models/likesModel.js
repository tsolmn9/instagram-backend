const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  postId: { type: mongoose.Types.ObjectId, ref: "posts" },
});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
