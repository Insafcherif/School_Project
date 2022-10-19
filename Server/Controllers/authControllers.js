const User = require("../SchemaModels/UserSchema");
const Parent = require("../SchemaModels/ParentSchema");
const Prof = require("../SchemaModels/ProfSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const userInfo = req.body;
  try {
    const searchedUser = await User.findOne({ email: userInfo.email });
    if (searchedUser) {
      res.status(401).json({ errors: [{ msg: "user already exist" }] });
    }
    if (!searchedUser) {
      const hashedPasword = await bcrypt.hash(userInfo.password, 10);
      const user = new User({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        age: userInfo.age,
        email: userInfo.email,
        password: hashedPasword,
        gender: userInfo.gender,
        Pict: userInfo.Pict,
        Phone: userInfo.Phone,
        address: userInfo.address,
        role: userInfo.role,
      });
      await user.save();
      const token = jwt.sign({ id: user._id }, "shhhhh");
      res
        .status(200)
        .json({ errors: [{ message: "saved successfully", user, token }] });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed exist" }] });
  }
};

const signUpPart = async (req, res) => {
  const parentInfo = req.body;
  try {
    const searchedParent = await Parent.findOne({ email: parentInfo.email });
    if (searchedParent) {
      res.status(401).json({ errors: [{ msg: "Parent already exist" }] });
    }
    if (!searchedParent) {
      const hashedPasword = await bcrypt.hash(parentInfo.password, 10);
      const parent = new Parent({
        firstName: parentInfo.firstName,
        lastName: parentInfo.lastName,
        age: parentInfo.age,
        email: parentInfo.email,
        password: hashedPasword,
        gender: parentInfo.gender,
        Pict: parentInfo.Pict,
        Phone: parentInfo.Phone,
        address: parentInfo.address,
        role: parentInfo.role,
        Job: parentInfo.Job,
        Student: parentInfo.Student,
      });
      await parent.save();
      const token = jwt.sign({ id: parent._id }, "shhhhh");
      res
        .status(200)
        .json({ errors: [{ message: "saved successfully", parent, token }] });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed exist" }] });
  }
};

const signUpProf = async (req, res) => {
  const profInfo = req.body;
  try {
    const searchedParent = await Prof.findOne({ email: profInfo.email });
    if (searchedParent) {
      res.status(401).json({ errors: [{ msg: "professor already exist" }] });
    }
    if (!searchedParent) {
      const hashedPasword = await bcrypt.hash(profInfo.password, 10);
      const prof = new Prof({
        firstName: profInfo.firstName,
        lastName: profInfo.lastName,
        age: profInfo.age,
        email: profInfo.email,
        password: hashedPasword,
        gender: profInfo.gender,
        Pict: profInfo.Pict,
        Phone: profInfo.Phone,
        address: profInfo.address,
        role: profInfo.role,
        bio: profInfo.bio,
        date_of_birth: profInfo.date_of_birth,
        contactType: profInfo.contactType,
        ContactDate: profInfo.ContactDate,
        subject: profInfo.subject,
        empolyee_id: profInfo.empolyee_id,
      });

      await prof.save();
      const token = jwt.sign({ id: prof._id }, "shhhhh");
      res
        .status(200)
        .json({ errors: [{ message: "saved successfully", prof, token }] });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed exist" }] });
  }
};

const logIn = async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "you must register before" }] });
    } else {
      const result = await bcrypt.compare(userInfo.password, user.password);
      if (!result) {
        res.status(401).json({ errors: [{ msg: "wrong password" }] });
      } else {
        const token = await jwt.sign({ id: user._id }, "shhhhh");
        res.status(401).json({ user, token });
      }
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed" }] });
  }
};

module.exports = { logIn, signUp, signUpPart, signUpProf };

