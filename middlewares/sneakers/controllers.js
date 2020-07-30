const Sneaker = require("./model");

const sneakersControllers = {
  getAll: async (req, res) => {
    const sneakers = await Sneaker.find({});

    res.status(200).send({
      message: "Get all sneakers",
      sneakers: sneakers,
    });
  },
};

module.exports = sneakersControllers;
