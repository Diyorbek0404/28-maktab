const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")


// update user
router.put("/:id", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
            username: req.body.password,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delele user
router.delete("/:id", async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json(error)
    }
})

// get all users
router.get("/", async (req, res) => {
    const { q } = req.query;
    try {
        const keys = ["username", "password"];
        const search = (data) => {
            return data.filter((item) =>
                keys.some((key) => item[key].toLowerCase().includes(q))
            );
        };
        const users = await User.find()
        q ? res.json(search(users).slice(0, 10)) : res.json(users.slice(0, 10));
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router