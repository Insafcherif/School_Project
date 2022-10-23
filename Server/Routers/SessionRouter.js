const express = require("express");
const router = express.Router();
const {
    updateData, deleteData, addNew, getOnebytId, getAll, findData
} = require ("../Controllers/SessionControllers")

router.get("/all", getAll);
router.get("/:id",getOnebytId);
router.post("/add", addNew);
router.put("/:id", updateData);
router.delete("/:id", deleteData);
router.post("/find", findData);

module.exports = router;