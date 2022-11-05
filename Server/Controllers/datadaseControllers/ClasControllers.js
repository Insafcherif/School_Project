const Class = require("../../SchemaModels/ClasSchema");
const Level = require("../../SchemaModels/levelSchema");
const mongoose = require("mongoose");

//Get all

const getAll = async (req, res) => {
  try {
    const listClass = await Class.find().populate("Level_id");
    if (listClass.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ listClass: listClass });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all data is failed!" }] });
  }
};

//Get  By ID

const getOnebytId = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedData = await Class.findOne({ _id: id });
    if (!searchedData) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ class: searchedData });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one data is failed" }] });
  }
};

//Add new data

const addNew = async (req, res) => {
  const { level } = req.params;

  const classInfo = req.body;
  try {
    const levelNum = await Level.findOne({ levelNumber: level });
    const levelId = levelNum._id;
    const newClass = new Class({
      className: classInfo.className,
      Salle: classInfo.Salle,
      Level_id: levelId,
      Year: classInfo.Year,
    });
    const searchedClass = await Class.find({ className: newClass.className });
    if (!(searchedClass.length == 0)) {
      res.status(201).json({ errors: [{ msg: "Class already exist" }] });
    } else {
      await newClass.save();
      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        class: newClass,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding  new clas is failed" }] });
  }
};

const deleteallData = async (req, res) => {
  try {
    await Class.remove({});

    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting all is failed" }] });
  }
};

//Delete data

const deleteData = async (req, res) => {
  const id = req.params.id;
  try {
    await Class.findByIdAndDelete(id);
    const listClass = await clas.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      listClass: listClass,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedData = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      errors: [{ msg: "updating is succesfully" }],
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Updating  is failed" }] });
  }
};

//find data my name

const findData = async (req, res) => {
  const name = req.body.name;
  try {
    const query = {};
    query[name] = { $regex: req.body.value };
    const resultList = await Class.find(query);
    if (!resultList) {
      return res.status(101).json({ errors: [{ msg: "Name not found" }] });
    } else {
      res.status(200).json({ resultList });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Finding data is failed" }] });
  }
};

module.exports = {
  updateData,
  deleteData,
  addNew,
  getOnebytId,
  getAll,
  findData,
  deleteallData,
};
