const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  try {
    const body = req.body;
    const { username, password, email, proImg } = body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newBody = {
      username,
      password: hashedPassword,
      email,
      proImg,
    };
    const response = await userModel.create(newBody);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const Posts = await userModel.find().populate("posts", "caption postImg");
    res.send(Posts);
  } catch (error) {
    console.log(error);
  }
};

const followUsers = async (req, res) => {
  const { followersId, followingId } = req.body;
  if (await userModel.findOne({ followers: followingId }))
    res.send("already followed");
  try {
    await userModel.findByIdAndUpdate(followersId, {
      $addToSet: {
        followers: followingId,
      },
    });
    await userModel.findByIdAndUpdate(followingId, {
      $addToSet: {
        following: followersId,
      },
    });
    res.send("Done");
  } catch (error) {
    console.log(error);
  }
};

const unFollowUser = async (req, res) => {
  const { followersId, followingId } = req.body;
  const checkFollower = await userModel.findOne({ followers: followingId });
  if (checkFollower) {
    await userModel.findByIdAndUpdate(followersId, {
      $pull: {
        followers: followingId,
      },
    });
    await userModel.findByIdAndUpdate(followingId, {
      $pull: {
        following: followersId,
      },
    });
    res.send(`Deleted `);
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const posts = await userModel.findOne({ _id: userId }).populate([
      {
        path: "posts",
        populate: [
          { path: "likes", select: "username proImg" },
          {
            path: "comments",
            select: "comment userId",
            populate: {
              path: "userId",
              select: "username proImg",
            },
          },
        ],
      },
    ]);
    res.send(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupUser,
  getUser,
  followUsers,
  unFollowUser,
  getUserPosts,
};
