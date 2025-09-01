const mongoose = require("mongoose");
let baseUrl = process.env.MONGODB_DATABASE_URL;
if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
const { dbName } = require("../Constant/constant.js");
const dbConnect = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      `${baseUrl}/${dbName}?retryWrites=true&w=majority`
    );
    // console.log(databaseInstance);

    if (databaseInstance) {
      console.log(
        "Database connected successfully at: ",
        databaseInstance.connection.host
      );
    }
  } catch (error) {
    console.log("Error in DB connection", error);
  }
};
module.exports = { dbConnect };
