const express = require("express");
const router = express.Router();
const {
  updateFee,
  addFee,
  findAbsence,
  findAttdnce,
  addAttendance,
} = require("../Controllers/Class_Management_Controllers");
const { extractToken } = require("../Midelwars/extracToken");

router.post("/attendance/add", extractToken, addAttendance);
router.get("/attendance/find", extractToken, findAttdnce);
router.get("/attendance/absence", extractToken, findAbsence);
router.post("/fee/add", extractToken, addFee);
router.put("/fee/updateStatus", extractToken, updateFee);

module.exports = router;
