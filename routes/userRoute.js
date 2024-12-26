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
userRouter.put("/followUsers", followUsers);
userRouter.delete("/unFollow", unFollowUser);
userRouter.get("/:userId", getOneUserInfo);

module.exports = userRouter;
