const Admin = require("../SchemaModels/AdminSchema");
const bcrypt = require("bcryptjs");

// Get all admins

const getAlladmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ admins: admins });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all Administrators is failed" }] });
  }
};

// get One Admin 

const getOneAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedAdmin = await Admin.findOne({ _id: id });
    if (!searchedAdmin) {
      return res.status(101).json({ errors: [{ msg: "Administrator not found" }] });
    } else {
      res.status(200).json({ Admin: searchedAdmin });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one Administrator is failed" }] });
  }
};

// Add admin 

const addAdmin = async (req, res) => {
  const adminInfo = req.body;
  try {
    const hashedPasword = await bcrypt.hash(adminInfo.password, 10);
    const newAdmin = new Admin({
      firstName: adminInfo.firstName,
      lastName: adminInfo.lastName,
      age: adminInfo.age,
      email: adminInfo.email,
      password: hashedPasword,
      gender: adminInfo.gender,
      Pict: adminInfo.Pict,
      Phone: adminInfo.Phone,
      address: adminInfo.address,
      role: "Administrator",
      fonction : adminInfo.fonction,
      joining_year : adminInfo.joining_year,
      empolyee_id : adminInfo.empolyee_id
    });
    const admins = await User.find();
    const searchedAdmin = admins.find((elt) => elt.email == adminInfo.email);
    if (searchedAdmin) {
      res.status(201).json({ errors: [{ msg: "Administrator already exist" }] });
    } else {
      await newAdmin.save();
      res.status(200).json({
        errors: [{ msg: "add Administrator is succesfully done" }],
        user: newAdmin,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "add Administrator is failed" }] });
  }
};

// delete user

const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    const admins = await User.find();
    res
      .status(200)
      .json({ errors: [{ msg: "delete is succesfully done" }], admins: admins });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "delete Administrator is failed" }] });
  }
};

// Update User

const updateAdmin = async (req, res) => {
  const id = req.params.id;
  const adminInfo = req.body;
  try {
    const updateAdmin = await Admin.findByIdAndUpdate(id, adminInfo, {
      new: true,
    });
    const admins = await Admin.find();
    res
      .status(200)
      .json({ errors: [{ msg: "update Administrator is succesfully" }], updateAdmin });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "update Administrator is failed" }] });
  }
};

module.exports = { getAlladmins, getOneAdmin, addAdmin, deleteAdmin, updateAdmin };
