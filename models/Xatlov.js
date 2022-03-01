const mongoose = require("mongoose")

const XatlovSchema = new mongoose.Schema({
    hafta: {
        type:String,
        required: true
    },
    jami: {
        type:String,
        required: true
    },
    javobsoragan: {
        type: String, 
        required: true,
        unique: false
    },
    kelmagan: {
        type:String,
        required:true
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Xatlov", XatlovSchema)