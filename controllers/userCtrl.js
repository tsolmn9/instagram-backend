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

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    });
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

const getOneUserInfo = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const response = await userModel.findOne({ _id: idPost }).populate([
      {
        path: "posts",
        populate: [
          { path: "userId", select: "username email profileImg" },
          { path: "like", select: "username email profileImg" },
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
