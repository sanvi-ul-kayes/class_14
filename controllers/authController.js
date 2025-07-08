const emailValidateCheck = require("../helpers/emailValidateCheck");
const authSchema = require("../schema/authSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
});

//localhost:8989/api/v1/auth/registration
async function registrationController(req, res) {
  try {
    let { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      res.send("All field require");
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          res.send(err);
        } else {
          if (!emailValidateCheck(email)) {
            res.status(400).send("You've entered an Invalid Email");
          } else {
            const users = new authSchema({
              name,
              email,
              password: hash,
              role,
              OTP: otp,
            });
            await users.save();
            const OTP = await authSchema.findOneAndUpdate(
              { email },
              { $set: { OTP: otp } },
              { new: true }
            );
            setTimeout(async () => {
              const OTP = await authSchema.findOneAndUpdate(
                { email },
                { $set: { OTP: null } },
                { new: true }
              );
            }, 500000);
            res.status(201).send({
              success: true,
              msg: "Registration is successful",
              data: users,
            });
          }
        }
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: "Invalid credantial", data: error });
  }
}

//localhost:8989/api/v1/auth/login
async function loginController(req, res) {
  let { email, password } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        if (result == true) {
          const userId = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };
          if (userId.role == "user") {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });
            res.status(200).send({
              success: true,
              msg: "User Login successful",
              data: userId,
              token,
            });
          } else {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });
            res.status(200).send({
              success: true,
              msg: "Admin Login successful",
              data: userId,
              token,
            });
          }
        } else {
          res.send("Invalid Email or password");
        }
      }
    });
  } else {
    res.status(500).send({ success: false, msg: "Invalid credantial" });
  }
}

//localhost:8989/api/v1/auth/otp_varify
async function otpVarifyController(req, res) {
  let { email, OTP } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    if (existingUser.OTP == OTP) {
      existingUser.isVarify = true;
      res
        .status(200)
        .send({ success: true, msg: "OTP is varified", data: existingUser });
    } else {
      res.status(500).send("Invalid OTP");
    }
  } else {
    res.send("Invalid Credantial");
  }
}

//localhost:8989/api/v1/auth/resend_otp
async function otpresendController(req, res) {
  let { email, OTP } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    existingUser.OTP = otp;
    await existingUser.save();
    setTimeout(async () => {
      existingUser.OTP = null;
      await existingUser.save();
    }, 10000);
    res.status(200).send({ msg: "OTP Re_send successful", existingUser });
  } else {
    res.status(500).send({ success: false, msg: "Invalid credantial" });
  }
}

module.exports = {
  registrationController,
  loginController,
  otpVarifyController,
  otpresendController,
};
