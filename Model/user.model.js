const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema(
   {
      name: String,
      email: String,
      gender: String,
      password: String,
      age: Number,
      city: String,
      is_married: Boolean,
   },
   {
      versionKey: false,
   }
);

// Model
const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
