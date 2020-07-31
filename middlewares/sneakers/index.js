const express = require("express");
const router = express.Router();

const sneakers = require("./controllers");
const auth = require("../auth/controllers");

const { upload } = require("../../utils/multer");

router.post("/seed", sneakers.seed);
router.post("/", auth.isAuthenticated, sneakers.create);
router.get("/", sneakers.getAll);

router.post("/upload", upload.single("sneaker"), (req, res) => {
  console.log(req.file, req.body);

  res.status(201).send({
    message: "Sneaker image uploaded",
    file: req.file,
    body: req.body,
  });
});

module.exports = router;
