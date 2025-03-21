const Router = require("express");
const {
  signupUser,
  followUsers,
  unFollowUser,
  getOneUserInfo,
  loginUser,
  getOneUser,
  getAllUser,
} = require("../controllers/userCtrl");
const authMiddleware = require("../authMiddleware");
const userRouter = Router();

userRouter.post("/createUser", signupUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/getUser", authMiddleware, getOneUser);
userRouter.post("/followUsers", authMiddleware, followUsers);
userRouter.delete("/unFollow", authMiddleware, unFollowUser);
userRouter.get("/oneUser/:userId", authMiddleware, getOneUserInfo);
userRouter.get("/users", authMiddleware, getAllUser);

module.exports = userRouter;
