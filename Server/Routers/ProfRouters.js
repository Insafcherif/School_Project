const express = require("express");
const router = express.Router();
const {
  getAllProfs,
  getOneProfById,
  addProf,
  deteleProf,
  updateProf,
  findProf,
  schedulMeeting,
} = require("../Controllers/ProfControllers");
const  {extractToken} = require("../Midelwars/extracToken");


router.get("/allprofs", extractToken, getAllProfs);
router.get("/:id",extractToken, getOneProfById);
router.post("/addprof", extractToken, addProf);
router.delete("/:id",extractToken, deteleProf);
router.put("/:id", extractToken,updateProf);
router.post("/find", findProf);
router.post("/scheduleMeeting",extractToken, schedulMeeting);

module.exports = router;
