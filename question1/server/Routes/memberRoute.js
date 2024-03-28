const express = require("express")
const router = express.Router()
const multer = require("multer")
const { createNewMember, getAllMembers, getMembersById, updateMember, deleteMember }=require ("../Controllers/memerController")
const upload = multer({ dest: './public/upload/' })

router.get("/",getAllMembers)
router.get("/:_id",getMembersById)
router.post("/",upload.single('Img'),createNewMember)
router.put("/",upload.single('Img'),updateMember)
router.delete("/:_id",deleteMember)
module.exports = router
