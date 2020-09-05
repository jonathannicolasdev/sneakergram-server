const mongoose = require("../../config/mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

// User schema
const UserSchema = Schema(
  {
    name: {
      type: String,
      min: [2, "Name is too short"],
      max: [100, "Name is too long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      min: [2, "Username is too short"],
      max: [100, "Username is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      min: [2, "Email is too short"],
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatarUrl: {
      type: String,
      default: `${process.env.API_URL}/images/avatar.png`,
    },
    bio: {
      type: String,
    },
    sneakers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sneaker",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
UserSchema.plugin(AutoIncrement, {
  id: "users_counter",
  inc_field: "id",
});

// User model => users collection
const User = mongoose.model("User", UserSchema);

module.exports = User;
