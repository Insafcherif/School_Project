const express = require("express");
const router = express.Router();
const {
  updateData,
  deleteData,
  addParenttoStudent,
  getOnebytId,
  getAllParentsforStudent,
  findData,
  getAllParents
} = require("../../Controllers/RelationControllers/Parent_Student_Controllers");

router.get("/:id/allParent", getAllParentsforStudent);
router.get("/allParents", getAllParents);
router.get("/:id", getOnebytId);
router.post("/:student/:parent/addparentRel", addParenttoStudent);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/find", findData);


module.exports = router;
