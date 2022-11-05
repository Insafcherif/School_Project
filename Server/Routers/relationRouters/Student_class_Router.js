const express = require("express");
const router = express.Router();
const {
  updateData,
  deleteData,
  getOnebytId,
  findData,
  getAll,
  addClassStudent,
  deleteallData,
  addStudenttoClass,
  getStudentOneClass,
} = require("../../Controllers/RelationControllers/Student_class_Controllers");

// router.get("/:id/allParent", getAllParentsforStudent);
router.get("/allrelations", getAll);
// router.get("/allParents", getAllParents);
router.delete("/deleteall", deleteallData);
router.get("/:id", getOnebytId);
router.post("/:id/:className/addcltoStud", addClassStudent);
router.post("/:id/:student/addstudClass", addStudenttoClass);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/find", findData);
router.get("/:id/AllStudent", getStudentOneClass);

module.exports = router;
