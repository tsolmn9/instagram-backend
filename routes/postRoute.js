const Router = require("express");
const {
  createPost,
  getPosts,
  getOnePostComment,
} = require("../controllers/postCtrl");
const postRouter = Router();

postRouter.post("/createPost", createPost);
postRouter.get("/getPosts", getPosts);
postRouter.get("/:postId", getOnePostComment);

module.exports = postRouter;
