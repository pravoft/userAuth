const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{type:String, require:true},
    content:{type:String, require:true},
    // user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
},{timestamps:true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post