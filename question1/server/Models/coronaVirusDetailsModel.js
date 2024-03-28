const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
    vaccineManufacturer: { type: String},
    vaccinationDate: { type: Date}
});

const coronaVirusDetailsModel = new mongoose.Schema({
    vaccineRecords: [vaccinationSchema],
    positiveTestDate:
    {
        type: Date
    },
    recoveryDate: {
        type: Date
    }
});

module.exports = mongoose.model('coronaVirusDetails', coronaVirusDetailsModel);
