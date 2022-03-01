const mongoose = require("mongoose")

const OperatingSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    desc: {
        type: String,
        required:true
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Operating", OperatingSchema)