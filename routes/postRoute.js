const Router = require("express");
const {
  createPost,
  getPosts,
  getOnePostComment,
} = require("../controllers/postCtrl");
const postRouter = Router();
const authMiddleware = require("../authMiddleware");

postRouter.post("/createPost", createPost);
postRouter.get("/getPosts", authMiddleware, getPosts);
postRouter.get("/:postId", getOnePostComment);

module.exports = postRouter;
