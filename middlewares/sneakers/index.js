const express = require("express");
const router = express.Router();

const sneakers = require("./controllers");
const auth = require("../auth/controllers");

router.post("/seed", sneakers.seed);
router.post("/", auth.isAuthenticated, sneakers.create);
router.get("/", sneakers.getAll);

module.exports = router;
