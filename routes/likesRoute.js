const Router = require("express");
const { likedPost, disLike, getLikes } = require("../controllers/likesCtrl");
const authMiddleware = require("../authMiddleware");
const likeRouter = Router();

likeRouter.post("/likedPost", authMiddleware, likedPost);
likeRouter.delete("/disLike", authMiddleware, disLike);

module.exports = likeRouter;
