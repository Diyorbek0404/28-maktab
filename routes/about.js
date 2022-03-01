const router = require("express").Router()
const About = require("../models/About")

// create about
router.post("/", async (req, res) => {
    const newPost = await new About(req.body)
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

// get about
router.get("/", async (req, res) => {
    try {
        const post = await About.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// edit about
router.put("/:id", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            try {
                const post = await About.findByIdAndUpdate(req.params.id, { $set: req.body })
                res.status(200).json(post)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("siz admin emassiz")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// upload post about
router.put("/:id/photo", async (req, res) => {
    const newPhoto = {
        image: req.body.image,
    }
    try {
        const post = await About.findById(req.params.id)
        await post.updateOne({ $push: { photo: newPhoto } })
        res.status(200).json("yuklandi")
    } catch (error) {
        res.status(500).json(error)
    }
})


// like about
router.put("/:id/like", async (req, res) => {
    try {
        const post = await About.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("siz like bosdingiz")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("siz likeni qaytarib oldingiz ")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// get by id
router.get("/:id", async (req, res) => {
    try {
        const post = await About.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router