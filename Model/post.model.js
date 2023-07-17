const mongoose = require("mongoose");

// Schema
const postSchema = mongoose.Schema(
   {
      title: String,
      body: String,
      device: String,
      userID : String,
      user : String,
   },
   {
      versionKey: false,
   }
);

// Model
const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
