const mongoose = require("mongoose")

const MemberModel = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true,
    },
    identityCard: {
        type: String,
        require: true,
        unique: true,
    },
    address: {
        type: String,
    },
    DateOfBirth: {
        type: Date,
        require: true,
    },
    Telephone:
    {
        type: String,
        require: true,
    },
    MobilePhone:
    {
        type: String,
    },
    Img:
    {
        type: String,
    },
    coronaVirusDetails:
    {
        type: mongoose.Schema.Types.ObjectId,
    }
})

module.exports = mongoose.model('Member', MemberModel)