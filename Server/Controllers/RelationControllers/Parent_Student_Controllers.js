const ParStudRel = require("../../SchemaModels/RelationSchema/Parent_Student_Schema");
const Parent = require("../../SchemaModels/ParentSchema");
const Student = require("../../SchemaModels/StudentSchema");
const { deleteStudent } = require("../../Controllers/StudentControllers");
const mongoose = require("mongoose");

// Get all data
const getAll = async (req, res) => {
  try {
    const dataSchemas = await ParStudRel.find();
    if (dataSchemas.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ dataSchemas: dataSchemas });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all data is failed!" }] });
  }
};

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
    res.status(500).json({
      errors: [{ msg: "get all parnets of all students is failed!" }],
    });
  }
};

//Get all parents for one student

const getAllParentsforStudent = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const parents = await ParStudRel.find({ student_id: id }).populate(
      "parent_id"
    );
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

//Get all students for one Parent

const getStudentforOneParent = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const students = await ParStudRel.find({ parent_id: id }).populate(
      "parent_id"
    );
    if (students.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ students });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "get all students of the parent is failed!" }] });
  }
};

//Get  By ID

const getOnebytId = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedParentStudent = await ParStudRel.findOne({ _id: id });
    if (!searchedParentStudent) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ dataSchema: searchedParentStudent });
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
    const student = await Student.findOne({ firstName: req.params.student });
    const newPSrel = new ParStudRel({
      parent_id: parent._id,
      student_id: student._id,
      relation: partStudInfo.relation,
      is_parent: true,
    });
    const perRel = await ParStudRel.find({
      $and: [
        { parent_id: newPSrel.parent_id },
        { student_id: newPSrel.student_id },
      ],
    });
    if (!(perRel.length === 0)) {
      res
        .status(201)
        .json({ errors: [{ msg: "parent already adeed to student" }] });
    } else {
      await newPSrel.save();
      const newParent = await Parent.findByIdAndUpdate(
        { _id: newPSrel.parent_id },
        { $push: { student: student._id } },
        { new: true, useFindAndModify: false }
      );
      const newSudent = await Student.findByIdAndUpdate(
        { _id: newPSrel.student_id },
        { $set: { parent: parent._id } },
        { new: true, useFindAndModify: false }
      );

      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        parStudRel: newPSrel,
        newSudent,
        newParent,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding  new data is failed" }] });
  }
};
//Delete data

const deleteallData = async (req, res) => {
  try {
    await ParStudRel.remove({});
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting all is failed" }] });
  }
};

//Delete data by id

const deleteData = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    await ParStudRel.findByIdAndDelete(id);
    const parStudRels = await ParStudRel.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      parStudRels: parStudRels,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const updatedData = await ParStudRel.findByIdAndUpdate(id, req.body, {
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
    const resultList = await ParStudRel.find(query);
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
  getAllParents,
  getStudentforOneParent,
  deleteallData,
  getAll,
};
