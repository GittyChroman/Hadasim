// Importing the Member model
const Member = require("../Models/memberModel")
const CoronaVirusDetails = require("../Models/coronaVirusDetailsModel")
const fs = require('fs');
const path = require('path');


// Function to create a new member
const createNewMember = async (req, res) => {
    // Destructuring data from request body
    const { MobilePhone, Telephone, DateOfBirth, address, identityCard, lastName, firstName } = req.body

    const Img=req.file? req.file.path:null
    // Checking if required fields are missing
    if (!firstName || !lastName || !MobilePhone || !DateOfBirth || !address || !identityCard) 
        return res.status(400).send("All fields are required!")

    // Checking if the identity card already exists in the database
    const user = await Member.find({ identityCard: identityCard })
    if (user.length != 0) {
        return res.status(409).send("Duplicate identity Card")
    }

    // Creating a new member record in the database
    await Member.create({ firstName, lastName, identityCard, address, DateOfBirth, Telephone, MobilePhone, coronaVirusDetails: null,Img })
    return res.json("Created successfully")
}

// Function to get all members
const getAllMembers = async (req, res) => {
    // Retrieving all members from the database
    const allMembers = await Member.find().lean()
    return res.json(allMembers)
}

// Function to get a member by their ID
const getMembersById = async (req, res) => {
    const { _id } = req.params
    // Checking if the ID parameter is missing
    if (!_id)
        return res.status(400).send("ID is required!")
    // Finding the member by ID in the database
    const member = await Member.findById(_id)
    return res.json(member)
}

// Function to update member details
const updateMember = async (req, res) => {
    // Destructuring data from request body
    const { _id, MobilePhone, Telephone, DateOfBirth, address, identityCard, lastName, firstName, coronaVirusDetails} = req.body
    // Checking if the ID is missing
    if (!_id) return res.status(400).send("ID is required!")
    // Checking if required fields are missing
    if (!firstName || !lastName || !MobilePhone || !DateOfBirth || !address || !identityCard) 
        return res.status(400).send("All fields are required!")
    // Finding the member by ID in the database
    const member = await Member.findById(_id).exec()
    if (!member) return res.status(400).send("Member not found")

    // Checking for duplicate identity cards except for the current member
    const users = await Member.find()
    let u = []
    users.forEach((e) => {
        if (e.identityCard === identityCard && e._id.toString() !== _id)
            u.push(e)
    })
    if (u.length > 0) {
        return res.status(409).send("Duplicate identity Card")
    }

      // Deleting old image if Img field is being updated
      if(member.Img!=null)
      {
        if (req.file && req.file.path && req.file.path !== member.Img) {
            if (member.Img) {
                const imagePath = path.join(__dirname, '../public/upload', member.Img.split("\\")[2]);
                try {
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    } else {
                        console.error("Image file does not exist:", imagePath);
                    }
                } catch (err) {
                    console.error("Error deleting image:", err);
                }
            }
        }
      }
    

    // Updating member details
    member.MobilePhone = MobilePhone;
    member.Telephone = Telephone;
    member.DateOfBirth = DateOfBirth;
    member.address = address;
    member.identityCard = identityCard;
    member.lastName = lastName;
    member.firstName = firstName;
    member.coronaVirusDetails =coronaVirusDetails=="null"? null:coronaVirusDetails;
    req.file?member.Img=req.file.path:member.Img=member.Img
    const update = await member.save()
    return res.json(update)
}

// Function to delete a member by their ID
const deleteMember = async (req, res) => {
    const { _id } = req.params;
    const toDel=await Member.findById(_id)
    if(!toDel) 
    {
        return res.status(404).send("Member not found");

    }
    if(toDel.coronaVirusDetails)
    {
        const delCVD=await CoronaVirusDetails.findById({_id:toDel.coronaVirusDetails})
        if(delCVD)
        {
            await delCVD.deleteOne()
        }
    }


    if (toDel.Img) {
        const imagePath = path.join(__dirname, '../public/upload', toDel.Img.split("\\")[2]);
        try {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.error("Image file does not exist:", imagePath);
            }
        } catch (err) {
            console.error("Error deleting image:", err);
        }
    }
    await toDel.deleteOne()
    return res.send("deleted")

}
// Exporting functions for use in other files
module.exports = { createNewMember, getAllMembers, getMembersById, updateMember, deleteMember }
