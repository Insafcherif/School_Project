const express = require("express");
const router = express.Router();
const {
  getHomeWork,
  downloadHomeWork,
  UploadHomeWork,
} = require("../Controllers/HomeWorkControllers");

router.post(":class_id/:subject_id/:session_id/uploads", UploadHomeWork);
router.get("/:parent_id/download",downloadHomeWork );
router.get("/:class_id/get",getHomeWork )
module.exports = router;