const express = require("express");
const router = express.Router();
const {
    getAllProfs,
  getOneProf,
  addProf,
  deteleProf,
  updateProf,
} = require("../Controllers/ProfControllers");

router.get("/allprofs", getAllProfs);
router.get("/:id", getOneProf);
router.post("/addprof", addProf);
router.delete("/:id", deteleProf);
router.put("/:id", updateProf);

module.exports = router;
