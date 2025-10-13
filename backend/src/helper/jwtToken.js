const jwt = require("jsonwebtoken");

const generateToken = async (userInfo = {}) => {
  try {
    const token = await jwt.sign(
      {
        ...userInfo,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN }
    );
    return token;
  } catch (error) {
    console.error("❌ JWT Token Error:", error);
    return null;
  }
};

module.exports = { generateToken };
