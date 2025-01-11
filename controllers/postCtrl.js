const { populate } = require("../models/likesModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const { path } = require("../routes/likesRoute");

const createPost = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.userId;
    const response = await postModel.create(body);

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

module.exports = { createPost, getPosts, getOnePostComment };
