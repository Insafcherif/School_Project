const express = require("express");
const router = express.Router();
const {
  addSubjecttoLevel,
  getAll,
  deleteallData,
  deleteData,
  findData,
  updateData,
} = require("../../Controllers/RelationControllers/level_subjectControllers");

router.get("/all", getAll);
router.post("/addlevel", addSubjecttoLevel);
router.delete("/deletall", deleteallData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/find", findData);

module.exports = router;
