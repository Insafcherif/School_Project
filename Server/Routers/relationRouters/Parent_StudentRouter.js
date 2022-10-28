const express = require("express");
const router = express.Router();
const {
  updateData,
  deleteData,
  addParenttoStudent,
  getOnebytId,
  getAllParentsforStudent,
  findData,
  getAllParents,
  getStudentforOneParent,
  deleteallData,
  getAll,
} = require("../../Controllers/RelationControllers/Parent_Student_Controllers");

router.get("/:id/allParent", getAllParentsforStudent);
router.get("/allrelations", getAll)
router.get("/allParents", getAllParents);
router.delete("/deleteall", deleteallData);
router.get("/:id", getOnebytId);
router.post("/:student/:parent/addparentRel", addParenttoStudent);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/find", findData);
router.get("/:id/AllStudents", getStudentforOneParent);

module.exports = router;
