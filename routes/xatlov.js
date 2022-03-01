const router = require("express").Router()
const Xatlov = require("../models/Xatlov")

// create post 
router.post("/", async (req, res) => {
    const newPost = await new Xatlov(req.body)
    try {
        if (req.body.isAdmin === true) {
            const post = await newPost.save()
            res.status(200).json(post)
        } else {
            res.status(401).json("siz admin emassiz")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all posts and search posts
router.get("/", async (req, res) => {
    try {
        const post = await Xatlov.find().sort({$natural:-1}).limit(6); //for the latest record
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get post by id
router.get("/:id", async (req, res) => {
    try {
        const post = await Xatlov.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router