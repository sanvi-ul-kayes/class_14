const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extentionName = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueName + `.${extentionName}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
