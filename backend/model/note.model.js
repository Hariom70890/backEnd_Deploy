const mongoose = require("mongoose");

// Schema
const noteSchema = mongoose.Schema(
   {
      title: String,
      body: String,
      userID : String,
      user: String,
      category:String
   },
   {
      versionKey: false,
   }
);

// Model
const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
