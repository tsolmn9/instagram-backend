const likeModel = require("../models/likesModel");
const postModel = require("../models/postModel");

const likedPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.body;
    console.log(userId);
    const response = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: userId,
      },
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
const disLike = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.body;
    await postModel.findByIdAndUpdate(postId, {
      $pull: {
        likes: userId,
      },
    });
    res.send("dislike success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { likedPost, disLike };
