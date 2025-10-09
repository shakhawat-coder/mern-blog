const {
  apiError,
} = require("../../../../ecommerce/backend/Src/Utils/ApiError");
const { makeHashPassword } = require("../helper/bcrypt");
const userModel = require("../Model/user.model");

// ================user registration controller ===============
const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
    const user = new userModel({ name, email, password: hashedPassword });
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

module.exports = {
  registration,
};
