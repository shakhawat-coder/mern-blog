const { compare } = require("bcrypt");
const { generateToken } = require("../helper/jwtToken");
const {
  apiError,
} = require("../../../../ecommerce/backend/Src/Utils/ApiError");
const { makeHashPassword } = require("../helper/bcrypt");
const userModel = require("../Model/user.model");
const { apiResponse } = require("../utils/ApiResponse");

// ================user registration controller ===============
const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json(new apiError(false, null, "User already exists", true));
    }
    const hashedPassword = await makeHashPassword(password);
    console.log(hashedPassword);

    const user = new userModel({ name, email, password: hashedPassword });
    console.log(user);

    await user.save();
    return res
      .status(201)
      .json(new apiError(true, null, "User registered successfully", false));
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ====================user loging controller ===================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new apiError(false, null, "All fields are required", true));
    }
    const logedUser = await userModel.findOne({ email });
    if (!logedUser) {
      return res
        .status(404)
        .json(new apiError(false, null, "User not found", true));
    }
    // console.log(user);

    const isPasswordMatch = await compare(password, logedUser.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json(new apiError(false, null, "Invalid credentials", true));
    }
    const tokenPayload = {
      id: logedUser._id,
      email: logedUser.email,
    };
    const jwtToken = await generateToken(tokenPayload);
    if (jwtToken) {
      return res
        .status(200)
        .cookie("token", jwtToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "production", // only secure in prod
          sameSite: "lax",
        })
        .json(
          new apiResponse(
            true,
            {
              id: logedUser._id,
              email: logedUser.email,
              token: `Bearer ${jwtToken}`,
            },
            "Login success"
          )
        );
    }

    return res
      .status(200)
      .json(new apiResponse(true, null, "User logged in successfully", false));
  } catch (error) {
    console.error("❌ Loging Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ==================user logout controller ==================
const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production", // only secure in prod
        sameSite: "lax",
      })
      .json(new apiResponse(true, null, "User logged out successfully", false));
  } catch (error) {
    console.error("❌ Logout Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
}
// ========================get logged is user================
const getLoggedInUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json(new apiError(false, null, "User not found", true));
    }
    return res.status(200).json(new apiResponse(true, user, "Success", false));
  } catch (error) {
    console.error("❌ getLoggedInUser Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
// ================get single user by id================
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json(new apiError(false, null, "User not found", true));
    }
    return res.status(200).json(new apiResponse(true, user, "Success", false));
    
  } catch (error) {
    console.error("❌ getSingleUser Error:", error);
    return res
      .status(501)
      .json(new apiError(false, null, "Internal server error", true));
  }
};
module.exports = {
  registration,
  login,
  logout,
  getSingleUser,
  getLoggedInUser,
};
