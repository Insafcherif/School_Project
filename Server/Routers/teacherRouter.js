const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  addTeacher,
  getOneTeacher,
  deleteTeacher,
  updateteacher,
} = require("../Controllers/TeacherControllers");

router.get("/allteachers", getAllTeachers);
router.get("/:id", getOneTeacher);
router.post("/addteacher", addTeacher);
router.delete("/:id", deleteTeacher);
router.put("/:id", updateteacher);


module.exports = router;
