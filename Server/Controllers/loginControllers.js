require("dotenv").config();
const authSchema = require("../SchemaModels/auth_Schema");
const tokenSchema = require("../SchemaModels/token_Schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwt_key = process.env.JWT_KEY;

//login

const logIn = async (req, res) => {
  try {
    const userList = await authSchema.find({
      $or: [{ userName: req.body.username }, { phone: req.body.username }],
    });
    if (userList.length < 1) {
      return res
        .status(401)
        .json({ errors: [{ message: "Authorization Failed! You don't have an account" }] });
    } else if (
      userList &&
      bcrypt.compare(req.body.password, userList[0].password_hash)
    ) {
      const token = jwt.sign(
        {
          user_role: userList[0].user_role,
          user_id: userList[0].user_id,
        },
        jwt_key );

      const newTokenModel = new tokenSchema({
        user_id: userList[0].user_id,
        user_role: userList[0].user_role,
        token: token,
      });

      const tekenModel = await newTokenModel.save();
      res.status(200).json({
        errors: [{ msg: "Authorization Success" }],
        tekenModel,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Authorization Failed!" }] });
  }
};

// Verify whether the token is correct

// verifyToken, medlwar utils.extractToken,
const verifyToken = async (req, res) => {
  try {
    const tokenList = tokenSchema.find({ token: req.token }).exec();
    if (tokenList.length < 1) {
      res.status(401).json({ error: [{ message: "Verification Failed!" }] });
    } else {
      res.json({
        error: [{ message: "JWT Token is Valid" }],
        user_type: tokenList[0].user_type,
        user_id: tokenList[0].user_id,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Authorization Failed!" }] });
  }
};

module.exports = { verifyToken, logIn };
