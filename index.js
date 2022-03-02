const express = require("express")
const mongoose = require("mongoose")
const postRouter = require("./routes/post")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const latestRouter = require("./routes/latestpost")
const latesttenRouter = require("./routes/latesttenpost")
const popularpostRouter = require("./routes/popularpost")
const postlastfoutRouter = require("./routes/postlastfour")
const messageRoute = require("./routes/message")
const qulaylikRoute = require("./routes/qulaylik")
const operatingRoute = require("./routes/operating")
const studentRouter = require("./routes/student")
const aboutRouter = require("./routes/about")
const xatlovRouter = require("./routes/xatlov")
const multer = require("multer")
const path = require("path")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://kuldashev:mO5JzQd3x8annG8z@cluster0.r6vwn.mongodb.net/maktab?retryWrites=true&w=majority",  {
    
}).then(() => {
    console.log("mongodb ulandi")
})

app.use("/images", express.static(path.join(__dirname, "/images")))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
postlastfoutRouter
app.use("/api/post", postRouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/postlatest", latestRouter)
app.use("/api/postlatestten", latesttenRouter)
app.use("/api/popularpost", popularpostRouter)
app.use("/api/postlastfour", postlastfoutRouter)
app.use("/api/student", studentRouter)
app.use("/api/message", messageRoute)
app.use("/api/qulaylik", qulaylikRoute)
app.use("/api/operating", operatingRoute)
app.use("/api/about", aboutRouter)
app.use("/api/dashboard", xatlovRouter)


app.listen("5000" , () => {
    console.log("backend ishga tushdi")
})
