const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    title: {
        type: String, 
        required: true,
        unique: false
    },
    desc: {
        type:String,
        required:true
    },
    likes:{
        type: Array,
        default: []
    },
    comments: [{
        username: String,
        body:String
    }],
    photo: [{
        image: String
    }]
},{
    timestamps: true
});

module.exports = mongoose.model("Post", PostSchema)