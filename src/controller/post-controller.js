const Post = require("../models/post-model.js")

//create Post
const createPost = async (req, res) => {
    console.log("####################################",req)
    try {
        const {title, content} = req.body
        const post = await Post.create({title, content})
        res.status(201).json({
            success:true,
            post
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

//get all post
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            success : true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const {id} = req.params
        const {title, content} = req.body
        const post = await Post.findByIdAndUpdate(id, {title, content}, {new:true})
        if(!post){
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        await post.save()
        res.status(200).json({
            success:true,
            post
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
} 

const deletePost = async (req, res) => {
    try {
        const {id} = req.params
        const deletedPost = await Post.findByIdAndDelete(id)
        if(!deletedPost){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {createPost, getPosts, updatePost, deletePost}