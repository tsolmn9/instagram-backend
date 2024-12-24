const commentsModel = require("../models/commentModel");
const postModel = require("../models/postModel");

const createComment = async (req, res) => {
  try {
    const body = req.body;
    const { postId, comment } = body;
    const userId = req.userId;
    console.log(userId);
    const newComment = {
      comment,
      userId,
      postId,
    };
    const response = await commentsModel.create(newComment);
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: response._id,
      },
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const getComment = async (req, res) => {
  try {
    const post = await commentsModel
      .find()
      .populate("postId userId", "caption postImg, username email proImg");
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;
    await commentsModel.findByIdAndDelete(commentId);
    await postModel.findByIdAndUpdate(postId, {
      $pull: {
        comments: commentId,
      },
    });
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};

const editComment = async (req, res) => {
  const { id, updatingComment } = req.body;
  try {
    await commentsModel.findByIdAndUpdate(
      id,
      {
        comment: updatingComment,
      },
      { new: true }
    );
    res.send("success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createComment, getComment, deleteComment, editComment };
