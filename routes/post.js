const router = require("express").Router()
const Post = require("../models/Post")

// create post 
router.post("/", async (req, res) => {
    const newPost = await new Post(req.body)
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

// likes post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
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

// comments post
router.put("/:id/comments", async (req, res) => {
    const newComment = {
        username: req.body.username,
        body: req.body.body
    }
    try {
        const post = await Post.findById(req.params.id)
        await post.updateOne({ $push: { comments: newComment } })
        res.status(200).json("sizning fikringiz bazaga qo'shildi")
    } catch (error) {
        res.status(500).json(error)
    }
})

// photo upload post
router.put("/:id/photo", async (req, res) => {
    const newPhoto = {
        image: req.body.image,
    }
    try {
        const post = await Post.findById(req.params.id)
        await post.updateOne({ $push: { photo: newPhoto } })
        res.status(200).json("yuklandi")
    } catch (error) {
        res.status(500).json(error)
    }
})

// update post
router.put("/:id", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            try {
                const post = await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
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

// delele post
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("o'chirildi")
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all posts and search posts
router.get("/", async (req, res) => {
    const { q } = req.query;
    try {
        const keys = ["title", "desc",];

        const search = (data) => {
            return data.filter((item) =>
                keys.some((key) => item[key].toLowerCase().includes(q))
            );
        };
        const post = await Post.find()
        q ? res.json(search(post).slice(0, 10)) : res.json(post.slice(0, 10));
    } catch (error) {
        res.status(500).json(error)
    }
})

// get post by id
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router