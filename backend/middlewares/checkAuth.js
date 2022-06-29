const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: "You are not logged in!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "You are not logged in!",
      });
    }
    req.user = {
      id: payload.id,
    };
    next();
  });
};

module.exports = checkAuth;
