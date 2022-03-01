const User = require("../models/User")
const router = require("express").Router()
const bcrypt = require("bcrypt")


// registration user
router.post("/registration", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
            username: req.body.username,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}) 

// login user
router.post("/login", async(req, res) => {
    try {
       const user = await User.findOne({username: req.body.username})
       !user && res.status(404).json("bunday profil egasi mavjud emas")

       const validationpassword = await bcrypt.compare(req.body.password, user.password)
       !validationpassword && res.status(404).json("bunday profil egasi mavjud emas")

       res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router