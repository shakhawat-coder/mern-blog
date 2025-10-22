const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  console.log("Cookies received:", req.cookies);
console.log("Authorization header:", req.headers.authorization);
  try {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = {
      id: decode.id,
      email: decode.email,
    };
    next();
  } catch (error) {
    console.error("❌ Auth Guard Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized or Invalid access" });
  }
};

const adminGuard = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
  next();
};

module.exports = {  authGuard, adminGuard };
