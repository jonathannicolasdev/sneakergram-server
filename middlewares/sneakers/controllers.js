const Sneaker = require("./model");

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
};

module.exports = sneakersControllers;
