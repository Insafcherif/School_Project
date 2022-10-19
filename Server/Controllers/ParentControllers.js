const Parent = require("../SchemaModels/ParentSchema");
const bcrypt = require("bcryptjs");


const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    if (parents.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ parents: parents });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all parents is failed" }] });
  }
};
const getOneParent = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedParent = await Parent.findOne({ _id: id });
    if (!searchedParent) {
      return res.status(101).json({ errors: [{ msg: "parent not found" }] });
    } else {
      res.status(200).json({ parent: searchedParent });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one parent is failed" }] });
  }
};
const addParent = async (req, res) => {
  const parentInfo = req.body;
  try {
    const hashedPasword = await bcrypt.hash(parentInfo.password, 10);
    const newParent = new Parent({
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
    const parents = await Parent.find();
    const searchedParent = parents.find((elt) => elt.email == parentInfo.email);
    if (searchedParent) {
      res.status(201).json({ errors: [{ msg: "parent already exist" }] });
    } else {
      await newParent.save();
      res
        .status(200)
        .json({
          errors: [{ msg: "add parent is succesfully done" }],
          parent: newParent,
        });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "add parent is failed" }] });
  }
};
const deleteParent = async (req, res) => {
  const id = req.params.id;
  try {
    await Parent.findByIdAndDelete(id);
    const parents = await Parent.find();
    res
      .status(200)
      .json({
        errors: [{ msg: "delete is succesfully done" }],
        parents: parents,
      });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "delete parent is failed" }] });
  }
};
const updateParent = async (req, res) => {
  const id = req.params.id;
  const parentInfo = req.body;
  try {
    const updatedParent = await Parent.findByIdAndUpdate(id, parentInfo, {
      new: true,
    });

    const parents = await Parent.find();
    res
      .status(200)
      .json({
        errors: [{ msg: "update parent is succesfully" }],
        updatedParent,
      });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "update parent is failed" }] });
  }
};

module.exports = {
  getAllParents,
  getOneParent,
  addParent,
  deleteParent,
  updateParent,
};
