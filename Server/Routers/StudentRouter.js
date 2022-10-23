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

router.get("/allStudents", extractToken, getAllStudents);
router.get("/:id", extractToken, getOneStudentId);
router.post("/addStudent", extractToken, addStudent);
router.delete("/:id", extractToken, deleteStudent);
router.put("/:id", extractToken, updateStudent);


module.exports = router;
