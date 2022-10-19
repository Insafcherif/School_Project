const { body, validationResult } = require("express-validator");

const signUpIBaseShemaVal = [
  body("firstName", "you must type your first name").notEmpty(),
  body("lastName", "you must type your last name").notEmpty(),
  body("age", "you must type your age").notEmpty(),
  body("email", "format of email is invalid ").isEmail(),
  body("password", "your password must be at least 6 caracter ").isLength({
    min: 6,
  }),
  body("gender", "you must choose your gender").notEmpty(),
  body("role", "you must chosose your role").notEmpty(),
  body("address", "you must type your address").notEmpty(),
];
const loginValidation = [signUpIBaseShemaVal[3], signUpIBaseShemaVal[4]];
const validation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const SignUpParentVal = [
  body("Job", "you must type your job").notEmpty(),
  body("Student", "you must choose your children").notEmpty(),
];

const SignUpProfVal = [
  body("date_of_birth", "you must type your date of birth")
    .isISO8601()
    .toDate(),
  body("bio", "you must type your biography").notEmpty(),
  body("ContactDate", "you must choose the date of the start of your contact ")
    .isISO8601()
    .toDate(),
  body("contactType", "you must choose your contact type").notEmpty(),
  body("empolyee_id", "you must type your identification index")
    .isNumeric()
    .isLength({ min: 6 }),
  body("subject", "you must type your subject").notEmpty(),
];

const SignUpAdmin = [
  body("empolyee_id", "you must type your identification index")
    .isNumeric()
    .isLength({ min: 6 }),
  body("joining_year", "you must type your joining year")
    .isNumeric()
    .isLength({ min: 4 }),
  body("Job", "you must type your job").notEmpty(),
  body("fonction", "you must type your fonction in the school").notEmpty(),
  body("date_of_birth", "you must type your date of birth")
    .isISO8601()
    .toDate(),
];

module.exports = {
  signUpIBaseShemaVal,
  SignUpParentVal,
  loginValidation,
  validation,
  SignUpProfVal,
  SignUpAdmin,
};
