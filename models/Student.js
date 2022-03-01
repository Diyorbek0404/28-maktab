const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    sinf: {
        type:String,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model("Student", StudentSchema)