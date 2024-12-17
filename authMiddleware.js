const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) res.send({ message: "not found token" });
  const token = authHeader.split(" ")[1];
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodedToken) {
    req.user = decodedToken;
    next();
  } else {
    res.send("invalid token");
  }
};
module.exports = authMiddleware;
