const mongoose = require("../../config/mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const SneakerSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Sneaker name is required"],
      min: [2, "Sneaker name is too short"],
      max: [100, "Sneaker name is too long"],
    },
    imageUrl: {
      type: String,
      required: [true, "Sneaker image URL is required"],
    },
    style: { type: String },
    colorway: { type: String },
    retailPrice: { type: Number },
    releaseDate: { type: String },
    size: { type: String },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
SneakerSchema.plugin(AutoIncrement, {
  id: "sneakers_counter",
  inc_field: "id",
});

// Sneaker model => sneakers collection
const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;
