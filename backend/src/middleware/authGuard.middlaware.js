const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
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

module.exports = authGuard;
