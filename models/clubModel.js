const mongoose = require("mongoose")

const clubSchema = new mongoose.Schema({
    league: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    logo:{
        type: String,
        required: true
    }
}, {timestamps: true})

const clubModel = mongoose.model("Clubs", clubSchema)

module.exports = clubModel