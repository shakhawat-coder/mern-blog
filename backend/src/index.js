const dotenv = require("dotenv").config();
const app = require("./app.js");

const { dbConnect } = require("./Database/DBconnect.js");
dbConnect().then(() => {
  try {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
