const Router = require("express");
const {
  signupUser,
  getUser,
  followUsers,
  unFollowUser,
  getUserPosts,
  loginUser,
} = require("../controllers/userCtrl");
const userRouter = Router();

userRouter.post("/createUser", signupUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/getUser", getUser);
userRouter.put("/followUsers", followUsers);
userRouter.delete("/unFollow", unFollowUser);
userRouter.post("/getUserPosts", getUserPosts);

module.exports = userRouter;
