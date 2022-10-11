const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const userInfo = req.body;
  try {
    const searchedUser = await User.findOne({ email: userInfo.email });
    if (searchedUser) {
      res.status(401).json({ errors: [{ msg: "user already exist" }] });
    } 
    if (!searchedUser){
        const hashedPasword=await bcrypt.hash(userInfo.password, 10)
        const user = new User({
            
        })
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed exist" }] });
  }
};

const logIn = async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await User.findOne({ email: userInfo.email });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed" }] });
  }
};
