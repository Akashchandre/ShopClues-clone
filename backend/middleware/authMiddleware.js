const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader); 

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no valid token provided" });
  }

  const token = authHeader.split(" ")[1].trim();
  console.log("Extracted Token:", token); 

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message); 
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
