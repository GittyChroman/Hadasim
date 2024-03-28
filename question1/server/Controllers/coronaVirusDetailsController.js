const CoronaVirusDetails = require("../Models/coronaVirusDetailsModel")

const createNewCoronaVirusDetails = async (req, res) => {
    const { vaccineRecords, positiveTestDate, recoveryDate } = req.body;
    const cvd = await CoronaVirusDetails.create({ vaccineRecords, positiveTestDate, recoveryDate })
    return res.json(cvd);
}


const getAllCoronaVirusDetails = async (req, res) => {
    const allCoronaVirusDetails = await CoronaVirusDetails.find().lean()
    return res.json(allCoronaVirusDetails)
}


const getCoronaVirusDetailsById = async (req, res) => {
    const { _id } = req.params
    if (!_id) return res.status(400).send("id is require!")
    const cvd = await CoronaVirusDetails.findById(_id)
    if (!cvd) return res.status(400).send("not exist!")
    return res.json(cvd);
}

const updateCoronaVirusDetails = async (req, res) => {
    const { _id, vaccineRecords, positiveTestDate, recoveryDate } = req.body;
    if (!_id) res.status(400).send("id is required")
    ///////////////////////////////////////////
    // if(!vaccineRecords||! positiveTestDate||! recoveryDate) res.status(400).send(" is required")
    /////////////////////////////////////////
    const updatedDetails = await CoronaVirusDetails.findById(_id);
    // console.log(_id);
    if (!updatedDetails) return res.status(400).send("no cvd")
    updatedDetails.vaccineRecords = vaccineRecords;
    updatedDetails.positiveTestDate = positiveTestDate;
    updatedDetails.recoveryDate = recoveryDate;
    await updatedDetails.save()
    res.json(updatedDetails);
}


const deleteCoronaVirusDetails = async (req, res) => {
    const { _id } = req.params;

    const toDel=await CoronaVirusDetails.findById(_id)
    if(!toDel) 
    {
        return res.status(404).send("Member not found");

    }
    await toDel.deleteOne()
    return res.send("deleted")
  
  };
  

module.exports = { createNewCoronaVirusDetails, getAllCoronaVirusDetails, getCoronaVirusDetailsById, updateCoronaVirusDetails, deleteCoronaVirusDetails }