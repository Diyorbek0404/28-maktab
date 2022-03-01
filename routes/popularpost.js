const router = require("express").Router()
const Post = require("../models/Post")

// get post very latest post one
router.get("/",  async(req, res) => {
    try {
        const post = await Post.find()
        .sort(function(a,b) {
            if (a.likes > b.likes) return -1
            if (a.likes < b.likes) return 1
            return 0
        })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router