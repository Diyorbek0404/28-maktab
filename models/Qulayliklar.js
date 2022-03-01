const mongoose = require("mongoose")

const QulaylikSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Qulaylik", QulaylikSchema)