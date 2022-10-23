const express = require("express");
const router = express.Router();
const {
  getAllParents,
  getOneParentId,
  addParent,
  deleteParent,
  getMeeting,
  updateParent,
  findParents
} = require("../Controllers/ParentControllers");
const  {extractToken} = require("../Midelwars/extracToken")


router.get("/allpart", extractToken, getAllParents);
router.get("/:id",extractToken, getOneParentId);
router.post("/addPart", extractToken, addParent);
router.put("/:id", extractToken, updateParent);
router.delete("/:id", extractToken, deleteParent);
router.get("/meetings",extractToken, getMeeting);
router.post("/find", findParents);

module.exports = router;
