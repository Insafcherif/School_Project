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


router.get("/allprofs",  getAllProfs);
router.get("/:id", getOneProfById);
router.post("/addprof",  addProf);
router.delete("/:id", deteleProf);
router.put("/:id", updateProf);
router.post("/find", findProf);
router.post("/scheduleMeeting", schedulMeeting);

module.exports = router;
