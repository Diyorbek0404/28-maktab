const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    desc: {
        type:String,
        required: true
    },
    likes:{
        type: Array,
        default: []
    },
    photo: [{
        image: String
    }]
},{
    timestamps: true
});

module.exports = mongoose.model("About", AboutSchema)