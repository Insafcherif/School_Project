const express = require("express");
const router = express.Router();
const {
  updateStudent,
  deleteStudent,
  addStudent,
  getOneStudentId,
  getAllStudents,
} = require("../Controllers/StudentControllers");
const { extractToken } = require("../Midelwars/extracToken");

router.get("/allStudents",  getAllStudents);
router.get("/:id",  getOneStudentId);
router.post("/addStudent",  addStudent);
router.delete("/:id",  deleteStudent);
router.put("/:id",  updateStudent);


module.exports = router;
