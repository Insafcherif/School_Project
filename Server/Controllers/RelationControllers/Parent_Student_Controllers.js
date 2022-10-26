const ParStudRel = require("../../SchemaModels/RelationSchema/Parent_Student_Schema");
const Parent = require("../../SchemaModels/ParentSchema");
const Student = require("../../SchemaModels/StudentSchema");
const mongoose = require("mongoose");

//Get all parents of all students

const getAllParents = async (req, res) => {
  try {
    const parents = await ParStudRel.find()
      .populate("parent_id")
      .populate("student_id");
    if (parents.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ parents });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "get all parnets of all students is failed!" }] });
  }
};

//Get all parents for one student

const getAllParentsforStudent = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const parents = await ParStudRel.find({ student_id: id })
      .populate("parent_id")
      .populate("student_id");
    if (parents.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ parents });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "get all parnets of the student is failed!" }] });
  }
};

//Get  By ID

const getOnebytId = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedData = await DataSchema.findOne({ _id: id });
    if (!searchedData) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ dataSchema: searchedData });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one data is failed" }] });
  }
};

//Add new data

const addParenttoStudent = async (req, res) => {
  const partStudInfo = req.body;
  const { student, parent } = req.params;

  try {
    const parent = await Parent.findOne({ firstName: req.params.parent });
    const stuent = await Student.findOne({ firstName: req.params.student });
    const newPSrel = new ParStudRel({
      parent_id: parent._id,
      student_id: stuent._id,
      relation: partStudInfo.relation,
      is_parent: true,
    });
    await newPSrel.save();
    res.status(200).json({
      errors: [{ msg: "Added successfully" }],
      parStudRel: newPSrel,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding  new data is failed" }] });
  }
};

//Delete data

const deleteData = async (req, res) => {
  const id = req.params.id;
  try {
    await DataSchema.findByIdAndDelete(id);
    const dataSchemas = await DataSchema.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      dataSchemas: dataSchemas,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedData = await DataSchema.findByIdAndUpdate(id, req.body, {
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
    const resultList = await DataSchema.find(query);
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
  addParenttoStudent,
  getOnebytId,
  getAllParentsforStudent,
  findData,
  getAllParents
};
