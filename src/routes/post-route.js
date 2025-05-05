const express = require("express")
const router = express.Router()
const {createPost, getPosts, updatePost, deletePost} = require("../controller/post-controller.js")

router.post("/blogs",createPost)
router.get("/blogs", getPosts)
router.put("/blogs/:id", updatePost)
router.delete("/blogs/:id", deletePost)

module.exports = router