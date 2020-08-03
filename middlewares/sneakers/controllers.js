const Sneaker = require("./model");
const User = require("../users/model");

const sneakersData = require("./data.json");

const sneakersControllers = {
  seed: (req, res) => {
    sneakersData.map((sneaker) => {
      Sneaker.create(sneaker);
    });

    res.status(201).send({
      message: "Seed all sneakers",
    });
  },

  getAll: async (req, res) => {
    const sneakers = await Sneaker.find({});

    res.status(200).send({
      message: "Get all sneakers",
      sneakers: sneakers,
    });
  },

  create: async (req, res) => {
    try {
      console.log(req.file);

      const sneaker = await Sneaker.create({
        imageUrl: `/uploads/${req.file.filename}` || "",
        name: req.body.name || "dummy",
        style: req.body.style || "dummy",
        colorway: req.body.colorway || "dummy",
        retailPrice: req.body.retailPrice || 100,
        releaseDate: req.body.releaseDate || "2020-01-01",
        size: req.body.size || "4.5",
        location: req.body.location || "Canada",
        user: req.decoded.sub || "",
      });

      const user = await User.findOneAndUpdate(
        { _id: sneaker.user },
        { $push: { sneakers: sneaker._id } },
        { new: true, select: "-password -salt" }
      );

      res.status(201).send({
        message: "Create new sneaker",
        sneaker: sneaker,
        file: req.file,
        body: req.body,
        user: user,
      });
    } catch (error) {
      res.status(400).send({
        message: "Failed to create new sneaker",
      });
    }
  },
};

module.exports = sneakersControllers;
