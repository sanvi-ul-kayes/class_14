const express = require("express");
const {
  registrationController,
  loginController,
  otpVarifyController,
  otpresendController,
} = require("../../controllers/authController");
const authMiddleWare = require("../../middleWare/authMiddleWare");
const router = express.Router();

//localhost:8989/api/v1/auth/registration
router.post("/registration", registrationController);

//localhost:8989/api/v1/auth/login
router.post("/login", loginController);

//localhost:8989/api/v1/auth/otp_varify
router.get("/otp_varify", otpVarifyController);

//localhost:8989/api/v1/auth/resend_otp
router.get("/resend_otp", otpresendController);

//localhost:8989/api/v1/auth/user
router.get("/user", authMiddleWare, (req, res) => {
  res.send("Admin");
});

module.exports = router;
