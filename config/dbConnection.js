const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {

  try {
      await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("production db is running successfully"))
        .catch((error) => console.log(error.message));
  } catch (error) {
    console.log("db connection failed");
  }
};
module.exports = dbConnect;
