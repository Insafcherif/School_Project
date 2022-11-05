const mongoose = require("mongoose");
const Parent = require("../SchemaModels/ParentSchema");
const bcrypt = require("bcryptjs");
const tokenSchema = require("../SchemaModels/token_Schema");
const authSchema = require("../SchemaModels/auth_Schema");
const meetingSchema = require("../SchemaModels/MeetingSchema");
const DataSchema = require("../SchemaModels/RelationSchema/Parent_Student_Schema");
const { ObjectId } = require("mongodb");
const Student = require("../SchemaModels/StudentSchema");
const ParStudRel = require("../SchemaModels/RelationSchema/Parent_Student_Schema");

//Get all Parents

const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate("student");
    if (parents.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ parents: parents });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all parents is failed" }] });
  }
};

//Get parent By ID

const getOneParentId = async (req, res) => {
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

//Add new parent

const addParent = async (req, res) => {
  const parentInfo = req.body;
  try {
    const hashedPasword = await bcrypt.hash(parentInfo.password, 10);
    const newObjectID = mongoose.Types.ObjectId();
    const newParent = new Parent({
      id: newObjectID,
      nic: parentInfo.nic,
      firstName: parentInfo.firstName,
      lastName: parentInfo.lastName,
      age: parentInfo.age,
      email: parentInfo.email,
      password: hashedPasword,
      gender: parentInfo.gender,
      role: "Parent",
      Pict: parentInfo.Pict,
      Phone: parentInfo.Phone,
      address: parentInfo.address,
      Job: parentInfo.Job,
      access_level_id: parentInfo.access_level_id,
    });
    const newAuthModel = new authSchema({
      user_id: newObjectID,
      UserName: parentInfo.UserName,
      phone: parentInfo.phone,
      user_role: "Parent",
      password_hash: hashedPasword,
    });
    const parents = await Parent.find();
    const searchedParent = parents.find((elt) => elt.nic == parentInfo.nic);
    if (searchedParent) {
      res.status(201).json({ errors: [{ msg: "parent already exist" }] });
    } else {
      await newAuthModel.save();
      await newParent.save();
      res.status(200).json({
        errors: [{ msg: "New parent  added successfully" }],
        parent: newParent,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "Adding a new parent is failed" }] });
  }
};

//Delete all parent

const deleteParents = async (req, res) => {
  try {
    await Parent.remove({});
    res.status(200).json({
      errors: [{ msg: "deleting all parents is succesfully done" }],
    });
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "deleting all parents is failed" }] });
  }
};

//Delete parent by id

const deleteParent = async (req, res) => {
  const id = req.params.id;
  try {
    await ParStudRel.deleteMany({
      parent_id: mongoose.Types.ObjectId(id),
    });
    await Parent.findByIdAndDelete(id);
    const parents = await Parent.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      parents: parents,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting a parent is failed" }] });
  }
};

//Update parent

const updateParent = async (req, res) => {
  const id = req.params.id;
  const parentInfo = req.body;
  try {
    const updatedParent = await Parent.findByIdAndUpdate(id, parentInfo, {
      new: true,
    });

    const parents = await Parent.find();
    res.status(200).json({
      errors: [{ msg: "updating parent is succesfully" }],
      updatedParent,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Updating a parent is failed" }] });
  }
};

// Get any parent-teacher meeting scheduled

const getMeeting = async (req, res) => {
  try {
    const meetings = await meetingSchema.find({
      parent_id: req.body.parent_id,
    });
    res.status(200).json({
      errror: [{ message: "Parent-Teacher meeting added successfully" }],
      meetings,
    });
  } catch (error) {
    res.status(500).json({
      errors: [{ msg: "Adding a new Parent-Teacher meeting is failed" }],
    });
  }
};

//find parents my name

const findParents = async (req, res) => {
  const name = req.body.name;
  try {
    const query = {};
    query[name] = { $regex: req.body.value };
    const resultList = await Parent.find(query);
    if (!resultList) {
      return res.status(101).json({ errors: [{ msg: "Name not found" }] });
    } else {
      res.status(200).json({ resultList });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Finding parents is failed" }] });
  }
};

module.exports = {
  getAllParents,
  getOneParentId,
  addParent,
  deleteParent,
  getMeeting,
  updateParent,
  findParents,
  deleteParents,
};
