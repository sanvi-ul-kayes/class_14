const express = require("express");
const router = express.Router();
const api = require("./api");

const baseUrl = process.env.BASE_URL;

//localhost:8989/api/v1
router.use(baseUrl, api);

router.use(baseUrl, (req, res) => {
  res.send("No API found in this route");
});

module.exports = router;
