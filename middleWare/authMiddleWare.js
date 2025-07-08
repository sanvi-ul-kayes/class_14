var jwt = require("jsonwebtoken");

async function authMiddleWare(req, res, next) {
  let { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.send(err);
    } else {
      if (decoded.userId.role == "admin") {
        next();
      } else {
        res.status(500).send("Access denied");
      }
    }
  });
}

module.exports = authMiddleWare;
