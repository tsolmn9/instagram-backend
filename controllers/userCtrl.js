const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  try {
    const body = req.body;
    const { username, password, email } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    const response = await userModel.create(newUser);
    const token = jwt.sign(
      {
        userId: response._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).send({ token });
    console.log("working");
  } catch (error) {
    res.status(404).send(error);
    console.log("not working");
  }
};
const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const { username, password } = body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json("Username not found");
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect email and password combination");
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.send({ token });
  } catch (error) {
    res.status(500).send("Log in error");
  }
};
const getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const Posts = await userModel
      .findById(userId)
      .populate("posts", "caption postImg");
    res.send(Posts);
  } catch (error) {
    console.log(error);
  }
};

const followUsers = async (req, res) => {
  const followingId = req.userId;
  const { followersId } = req.body;

  try {
    const userToFollow = await userModel.findById(followingId);
    const userToBeFollowed = await userModel.findById(followersId);

    if (!userToFollow || !userToBeFollowed) {
      return res.status(404).json({ message: "User(s) not found." });
    }

    if (followingId === followersId) {
      return res.status(400).json({ message: "You can't follow yourself." });
    }

    await userModel.findByIdAndUpdate(
      followersId,
      {
        $addToSet: { followers: followingId },
      },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      followingId,
      {
        $addToSet: { following: followersId },
      },
      { new: true }
    );

    res.status(200).json({ message: "Followed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const unFollowUser = async (req, res) => {
  const followingId = req.userId;
  const { followersId } = req.body;
  const checkFollower = await userModel.find({ followers: followingId });
  if (checkFollower) {
    await userModel.findByIdAndUpdate(
      followersId,
      {
        $pull: {
          followers: followingId,
        },
      },
      { new: true }
    );
    await userModel.findByIdAndUpdate(
      followingId,
      {
        $pull: {
          following: followersId,
        },
      },
      { new: true }
    );
    res.send(`Deleted `);
  } else {
    res.send("User is not following");
  }
};

const getOneUserInfo = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const response = await userModel.findOne({ _id: userId }).populate([
      {
        path: "posts",
        populate: [
          {
            path: "comments",
            select: "comment userId",
            populate: { path: "userId", select: "username email profileImg" },
          },
        ],
      },
      {
        path: "followers",
        populate: {
          path: "_id",
        },
      },
      {
        path: "following",
        populate: {
          path: "_id",
        },
      },
    ]);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  getOneUser,
  followUsers,
  unFollowUser,
  getOneUserInfo,
};
