const Router = require("express");
const {
  createComment,
  getComment,
  editComment,
  deleteComment,
} = require("../controllers/commentCtrl");
const commentRouter = Router();

commentRouter.post("/createComment", createComment);
commentRouter.get("/getComment", getComment);
commentRouter.post("/editComment", editComment);
commentRouter.delete("/deleteComment", deleteComment);

module.exports = commentRouter;
