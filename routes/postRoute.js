const Router = require("express");
const {
  createPost,
  getPosts,
  getOnePostComment,
  getOnePost,
} = require("../controllers/postCtrl");
const postRouter = Router();
const authMiddleware = require("../authMiddleware");

postRouter.post("/createPost", authMiddleware, createPost);
postRouter.get("/getPosts", authMiddleware, getPosts);
postRouter.get("/:postId", authMiddleware, getOnePostComment);
postRouter.get("getOnePost/:postId", authMiddleware, getOnePost);

module.exports = postRouter;
