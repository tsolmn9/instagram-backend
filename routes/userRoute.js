const Router = require("express");
const userController = require("../controllers/userCtrl");
const userRouter = Router();

userRouter.post("/createUser", userController.signupUser);
userRouter.get("/getUser", userController.getUser);
userRouter.put("/followUsers", userController.followUsers);
userRouter.delete("/unFollow", userController.unFollowUser);
userRouter.post("/getUserPosts", userController.getUserPosts);

module.exports = userRouter;
