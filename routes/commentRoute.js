const Router = require("express");
const {
  createComment,
  getComment,
  editComment,
  deleteComment,
} = require("../controllers/commentCtrl");
const authMiddleware = require("../authMiddleware");
const commentRouter = Router();

commentRouter.post("/createComment", authMiddleware, createComment);
commentRouter.get("/getComment", getComment);
commentRouter.post("/editComment", editComment);
commentRouter.delete("/deleteComment", deleteComment);

module.exports = commentRouter;
