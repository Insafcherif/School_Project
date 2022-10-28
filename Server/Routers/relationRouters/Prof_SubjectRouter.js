const express = require("express");
const router = express.Router();
const {
  updateData,
  deleteData,
  getOnebytId,
  getAll,
  findData,
  AddSubjProf,
} = require("../../Controllers/RelationControllers/Prof_Subject_Controllers");

router.get("/all", getAll);
router.get("/:id", getOnebytId);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/find", findData);
router.post("/:id/:subject", AddSubjProf);

module.exports = router;
