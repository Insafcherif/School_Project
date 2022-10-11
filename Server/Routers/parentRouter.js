const express = require("express");
const router = express.Router();
const {
    getAllParents, addParent, getOneParent, deleteParent, updateParent
} = require("../Controllers/ParentControllers");

router.get("/allParents", getAllParents);
router.get("/:id", getOneParent);
router.post("/addParent", addParent);
router.delete("/:id", deleteParent);
router.put("/:id", updateParent);


module.exports = router;
