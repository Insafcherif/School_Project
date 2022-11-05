const express = require("express");
const router = express.Router();
const {
  updateData,
  deleteData,
  addNew,
  getOnebytId,
  getAll,
  findData,
  deleteallData,
} = require("../../Controllers/datadaseControllers/ClasControllers");

router.get("/all", getAll);
router.get("/:id", getOnebytId);
router.post("/:level/add", addNew);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.delete("/deleteall", deleteallData);
router.post("/find", findData);

module.exports = router;
