const { default: mongoose } = require("mongoose");

function dbConnect() {
  console.log("Connecting...");
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
