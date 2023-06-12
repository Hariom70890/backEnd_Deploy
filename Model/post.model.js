
const mongoose = require("mongoose")

// Schema
const postSchema = mongoose.Schema({
    title : String,
body : String,
device : String,
no_of_comments : Number,
},{
    versionKey:false
})

// Model
const PostModel = mongoose.model("post",postSchema);

module.exports = {PostModel}