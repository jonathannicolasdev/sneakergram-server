const express = require("express");
const router = express.Router();

const sneakers = require("./controllers");
const auth = require("../auth/controllers");

const { upload } = require("../../utils/multer");

router.post("/seed", sneakers.seed);
router.post("/");
router.get("/", sneakers.getAll);

router.post(
  "/",
  auth.isAuthenticated, // check token
  upload.single("sneaker"), // only handle the upload
  sneakers.create // actually create the sneaker data into collection
);

module.exports = router;
