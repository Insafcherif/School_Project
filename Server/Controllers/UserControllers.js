const User = require("../SchemaModels/UserSchema");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ users: users });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all users is failed" }] });
  }
};

const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedUser = await User.findOne({ _id: id });
    if (!searchedUser) {
      return res.status(101).json({ errors: [{ msg: "user not found" }] });
    } else {
      res.status(200).json({ user: searchedUser });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one user is failed" }] });
  }
};
const addUser = async (req, res) => {
  const userInfo = req.body;
  try {
    const hashedPasword = await bcrypt.hash(userInfo.password, 10);
    const newUser = new User({
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
    const users = await User.find();
    const searchedUser = users.find((elt) => elt.email == userInfo.email);
    if (searchedUser) {
      res.status(201).json({ errors: [{ msg: "user already exist" }] });
    } else {
      await newUser.save();
      res.status(200).json({
        errors: [{ msg: "add user is succesfully done" }],
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "add user is failed" }] });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    const users = await User.find();
    res
      .status(200)
      .json({ errors: [{ msg: "delete is succesfully done" }], users: users });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "delete user is failed" }] });
  }
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userInfo, {
      new: true,
    });
    const users = await User.find();
    res
      .status(200)
      .json({ errors: [{ msg: "update user is succesfully" }], updatedUser });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "update user is failed" }] });
  }
};

module.exports = { getAllUsers, getOneUser, addUser, deleteUser, updateUser };
