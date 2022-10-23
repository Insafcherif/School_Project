const express = require("express");
const router = express.Router();
const { verifyToken, logIn } = require("../Controllers/loginControllers");
const { extractToken } = require("../Midelwars/extracToken");

router.post("/", logIn);
router.post("/verifyToken", extractToken, verifyToken);
module.exports = router;