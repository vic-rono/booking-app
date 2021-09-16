const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    rentperday: {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],
    type: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }
}, {
    timeStamps: true
})

const roomModel = mongoose.model('rooms' , roomSchema)

module.exports = roomModel