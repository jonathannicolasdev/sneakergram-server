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
    const sneaker = await Sneaker.create({
      name: req.body.name || "",
      imageUrl: req.body.imageUrl || "",
      style: req.body.style || "",
      colorway: req.body.colorway || "",
      retailPrice: req.body.retailPrice || "",
      releaseDate: req.body.releaseDate || "",
      size: req.body.size || "",
      location: req.body.location || "",
      user: req.decoded.sub,
    });

    const user = await User.findOneAndUpdate(
      { _id: sneaker.user },
      { $push: { sneakers: sneaker._id } },
      { new: true, select: "-password -salt" }
    );

    res.status(201).send({
      message: "Create new sneaker",
      sneaker: sneaker,
      user: user,
    });
  },
};

module.exports = sneakersControllers;
