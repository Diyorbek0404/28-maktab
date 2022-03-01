const router = require("express").Router()
const Operating = require("../models/Operating")

// create operating
router.post("/", async (req, res) => {
    const newPost = await new Operating(req.body)
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

// get operating
router.get("/", async (req, res) => {
    try {
        const post = await Operating.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// edit operating
router.put("/:id", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            const post = await Operating.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json(post)
        } else {
            res.status(500).json("siz admin emassiz")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await Operating.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router