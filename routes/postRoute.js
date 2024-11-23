const Router = require("express");
const postController = require("../controllers/postCtrl");
const postRouter = Router();

postRouter.post("/createPost", postController.createPost);
postRouter.get("/getPosts", postController.getPosts);
postRouter.get("/getOnePost", postController.getOnePost);

module.exports = postRouter;
