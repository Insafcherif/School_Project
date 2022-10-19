const express = require("express");
const router = express.Router();
const {
  logIn,
  signUp,
  signUpPart,
  signUpProf,
  
} = require("../Controllers/AuthControllers");
const {
  signUpIBaseShemaVal,
  SignUpParentVal,
  loginValidation,
  validation,
  SignUpProfVal,
} = require("../Midelwars/validationFields");

router.post("/login", loginValidation, validation, logIn);
router.post("/sing-up", signUpIBaseShemaVal, validation, signUp);
router.post("/SUpPart", SignUpParentVal,signUpIBaseShemaVal, validation, signUpPart);
router.post("/SUpProf", SignUpProfVal, signUpIBaseShemaVal, validation, signUpProf);

module.exports = router;
