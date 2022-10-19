const express = require("express");
const router = express.Router();
const {
  getAllParents,
  getOneParent,
  addParent,
  deleteParent,
  updateParent,
} = require("../Controllers/ParentControllers");

router.get("/allpart", getAllParents);
router.get("/:id", getOneParent);
router.post("/addPart", addParent);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);

module.exports = router;
