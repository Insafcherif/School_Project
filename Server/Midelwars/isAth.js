const jwt = require("jsonwebtoken");
const User = require("../SchemaModels/UserSchema");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("token");
    const verifyToken = jwt.verify(token, "shhhhh");
    const user = await User.findById(verifyToken.id);
    if (!verifyToken) {
      res.status(400).json({ errors: [{ msg: "you are not authorized " }] });
    }
    if (verifyToken) {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed" }] });
  }
};
module.exports = isAuth;