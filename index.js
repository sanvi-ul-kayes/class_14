require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
dbConnect();

//localhost:8989
app.listen(process.env.LOCAL_HOST, () => {
  console.log("Server is running ");
});
