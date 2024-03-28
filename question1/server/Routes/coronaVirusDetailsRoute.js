const express = require("express")
const router = express.Router()

const { createNewCoronaVirusDetails, getAllCoronaVirusDetails, getCoronaVirusDetailsById, updateCoronaVirusDetails, deleteCoronaVirusDetails } = require("../Controllers/coronaVirusDetailsController")

router.get("/", getAllCoronaVirusDetails)
router.get("/:_id", getCoronaVirusDetailsById)
router.post("/", createNewCoronaVirusDetails)
router.put("/", updateCoronaVirusDetails)
router.delete("/:_id", deleteCoronaVirusDetails)

module.exports = router
