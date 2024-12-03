const Router = require("express");
const { createPost, getPosts, getOnePost } = require("../controllers/postCtrl");
const postRouter = Router();

postRouter.post("/createPost", createPost);
postRouter.get("/getPosts", getPosts);
postRouter.get("/getOnePost", getOnePost);

module.exports = postRouter;
