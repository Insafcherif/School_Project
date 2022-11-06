const express = require("express");
const router = express.Router();
const {
  updateStudent,
  deleteStudent,
  addStudent,
  getOneStudentId,
  getAllStudents, deleteAllStudents
} = require("../Controllers/StudentControllers");


router.get("/allStudents",  getAllStudents);
router.get("/:id",  getOneStudentId);
router.post("/addStudent",  addStudent);
router.delete("/:id",  deleteStudent);
router.put("/:id",  updateStudent);
router.delete("/deleteAll",deleteAllStudents )


module.exports = router;
