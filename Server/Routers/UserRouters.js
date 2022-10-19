const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
  updateUser,
} = require("../Controllers/UserControllers");

router.get("/allusers", getAllUsers);
router.get("/:id", getOneUser);
router.post("/adduser", addUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
