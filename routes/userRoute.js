const Router = require("express");
const {
  signupUser,
  followUsers,
  unFollowUser,
  getOneUserInfo,
  loginUser,
  getOneUser,
} = require("../controllers/userCtrl");
const authMiddleware = require("../authMiddleware");
const userRouter = Router();

userRouter.post("/createUser", signupUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/getUser", authMiddleware, getOneUser);
userRouter.post("/followUsers", authMiddleware, followUsers);
userRouter.delete("/unFollow", unFollowUser);
userRouter.get("/:userId", authMiddleware, getOneUserInfo);

module.exports = userRouter;
