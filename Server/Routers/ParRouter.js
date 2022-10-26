const express = require("express");
const router = express.Router();
const {
  getAllParents,
  getOneParentId,
  addParent,
  deleteParent,
  getMeeting,
  updateParent,
  findParents, 
} = require("../Controllers/ParentControllers");
const  {extractToken} = require("../Midelwars/extracToken")


router.get("/allpart",  getAllParents);
router.get("/:id", getOneParentId);
router.post("/addPart",  addParent);
router.put("/:id",  updateParent);
router.delete("/:id",  deleteParent);
router.get("/meetings", getMeeting);
router.post("/find", findParents);

module.exports = router;
