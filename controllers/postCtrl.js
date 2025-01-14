const { populate } = require("../models/likesModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const { path } = require("../routes/likesRoute");

const createPost = async (req, res) => {
  try {
    const { caption, postImg } = req.body;
    const userId = req.userId;
    console.log(userId);
    const response = await postModel.create({
      caption,
      postImg,
      userId,
    });

    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: response._id,
      },
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const getPosts = async (req, res) => {
  try {
    const Users = await postModel
      .find()
      .populate(
        "userId comments likes",
        "username password email comment userId proImg"
      );
    res.send(Users);
  } catch (error) {
    console.log(error);
  }
};
const getOnePostComment = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const post = await postModel.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username proImg email",
      },
    });
    res.send(post.comments);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const getOnePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId).populate([
      { path: "userId", select: "username email proImg" },
      { path: "likes", select: "username email proImg" },
      {
        select: "caption postImg",
        path: "comments",
        select: "comment userId",
        populate: { path: "userId", select: "username email profileImg" },
      },
    ]);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { createPost, getPosts, getOnePostComment, getOnePost };
