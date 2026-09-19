const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Fallback to headers if cookies aren't used for some reason, but primary is cookie
  const authHeader = req.headers['authorization'];
  const token = req.cookies?.accessToken || (authHeader && authHeader.split(' ')[1]);
  
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
