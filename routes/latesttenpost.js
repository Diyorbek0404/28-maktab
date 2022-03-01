const router = require("express").Router()
const Post = require("../models/Post")

// get post very latest post one
router.get("/", async (req, res) => {
    try {
        const post = await Post.find().sort({$natural:-1}).limit(10); //for the latest record
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router