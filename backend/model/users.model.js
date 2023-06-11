const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema(
   {
      name: String,
      email: String,
      pass: String
     
   },
   {
      versionKey: false,
   }
);

// Model
const UserModel = mongoose.model("user",userSchema);

module.exports = { UserModel };
