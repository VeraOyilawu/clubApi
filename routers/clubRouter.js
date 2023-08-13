const express = require("express")
const router = express.Router()
const {createClub,getAllClubs,getOneClub,updateClub,deleteClub} = require("../controllers/clubController")
const upload = require("../utils/cloudinary")
require("../utils/cloudinary")

router.post("/create", upload.single("logo"), createClub)
router.get("/allClubs", getAllClubs)
router.get("/:id", getOneClub)
router.put("/:id", upload.single("logo"), updateClub)
router.delete("/:id", deleteClub)

module.exports = router
