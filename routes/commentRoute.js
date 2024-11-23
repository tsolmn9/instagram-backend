const Router = require("express");
const commentController = require("../controllers/commentCtrl");
const commentRouter = Router();

commentRouter.post("/createComment", commentController.createComment);
commentRouter.get("/getComment", commentController.getComment);
commentRouter.post("/editComment", commentController.editComment);
commentRouter.delete("/deleteComment", commentController.deleteComment);

module.exports = commentRouter;
