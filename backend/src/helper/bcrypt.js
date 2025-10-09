const bcrypt = require("bcrypt");

const makeHashPassword = async (plainPassword) => {
  try {
    return await bcrypt.hash(plainPassword, 10);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

module.exports = { makeHashPassword };
