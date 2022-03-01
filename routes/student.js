const router = require("express").Router()
const Student = require("../models/Student")

// student added
router.post("/", async (req, res) => {
    const newPost = await new Student(req.body)
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

// get all an search
router.get("/", async (req, res) => {
    const { q } = req.query;
    try {
        const keys = ["name", "lastname", "email", "phone", "sinf"];

        const search = (data) => {
            return data.filter((item) =>
                keys.some((key) => item[key].toLowerCase().includes(q))
            );
        };
        const post = await Student.find()
        q ? res.json(search(post).slice(0, 10)) : res.json(post.slice(0, 10));
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/one", async (req, res) => {
    try {
        const post = await Student.find({sinf: "1-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/two", async (req, res) => {
    try {
        const post = await Student.find({sinf: "2-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/three", async (req, res) => {
    try {
        const post = await Student.find({sinf: "3-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/four", async (req, res) => {
    try {
        const post = await Student.find({sinf: "4-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/five", async (req, res) => {
    try {
        const post = await Student.find({sinf: "5-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/six", async (req, res) => {
    try {
        const post = await Student.find({sinf: "6-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/seven", async (req, res) => {
    try {
        const post = await Student.find({sinf: "7-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/sakks", async (req, res) => {
    try {
        const post = await Student.find({sinf: "8-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/toqqiz", async (req, res) => {
    try {
        const post = await Student.find({sinf: "9-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/on", async (req, res) => {
    try {
        const post = await Student.find({sinf: "10-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/onbr", async (req, res) => {
    try {
        const post = await Student.find({sinf: "11-sinf"})
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get by id
router.get("/:id", async (req, res) => {
    try {
        const post = await Student.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update post
router.put("/:id", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            try {
                const post = await Student.findByIdAndUpdate(req.params.id, { $set: req.body })
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

// delete student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json("o'chirildi")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router