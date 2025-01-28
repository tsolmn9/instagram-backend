const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token format is incorrect" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("Token has expired");

      const newToken = jwt.sign(
        {
          userId: req.userId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res
        .status(401)
        .send({ message: "Token expired, new token issued", token: newToken });
    } else {
      console.error("Token verification failed:", err);
      return res.status(401).send({ error: "Invalid token" });
    }
  }
};

module.exports = authMiddleware;
