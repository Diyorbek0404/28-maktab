const router = require("express").Router();
const Message = require("../models/Message");


// create message
router.post("/", async (req, res) => {
    const newMessage = await new Message(req.body)
    try {
        const message = await newMessage.save()
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all message
router.get("/", async (req, res) => {
    const { q } = req.query;

    const keys = ["name", "lastname", "email", "desc"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };
    const message = await Message.find().sort({ $natural: -1 })
    q ? res.json(search(message).slice(0, 10)) : res.json(message.slice(0, 10));

})

module.exports = router