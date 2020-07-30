const express = require("express");
const router = express.Router();

const sneakers = require("./controllers");

router.get("/", sneakers.getAll);

module.exports = router;
