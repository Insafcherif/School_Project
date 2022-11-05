const StudentClass = require("../../SchemaModels/RelationSchema/student_class_Schema");
const Class = require("../../SchemaModels/ClasSchema");
const Student = require("../../SchemaModels/StudentSchema");
const mongoose = require("mongoose");

//Get all

const getAll = async (req, res) => {
  try {
    const StClassList = await StudentClass.find()
      .populate("class_id")
      .populate("students_id");
    if (StClassList.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ StClassList: StClassList });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all data is failed!" }] });
  }
};

//Get  By ID

const getOnebytId = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedData = await StudentClass.findOne({ _id: id });
    if (!searchedData) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ StudentClass: searchedData });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one data is failed" }] });
  }
};
//Get all students by class

const getStudentOneClass = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const searchedData = await StudentClass.findOne({ class_id: id }).populate("students_id");;
    console.log(searchedData.students_id);
    if (!searchedData) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ studentClass: searchedData });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one data is failed" }] });
  }
};

//Add class to student

const addClassStudent = async (req, res) => {
  const { id, className } = req.params;
  const StClInfo = req.body;
  try {
    const student = await Student.findOne({ _id: req.params.id });
    const searClass = await Class.findOne({ className: req.params.className });
    const newStudentClass = new StudentClass({
      class_id: searClass._id,
      students_id: [student._id],
      reg_date: StClInfo.reg_date,
      end_date: StClInfo.end_date,
    });
    const findStInCLass = await StudentClass.find({
      $and: [
        { class_id: newStudentClass.class_id },
        { students_id: newStudentClass.students_id },
      ],
    });
    const findclass = await StudentClass.findOne({
      class_id: newStudentClass.class_id,
    });
    if (!(findStInCLass.length === 0)) {
      res
        .status(201)
        .json({ errors: [{ msg: "Student already adeed to this class" }] });
    } else if (findclass) {
      findclass.students_id.push(newStudentClass.students_id);
      await findclass.save();
      const updateClass = await Class.findByIdAndUpdate(
        { _id: findclass.class_id },
        { $push: { students: student._id } },
        { new: true, useFindAndModify: false }
      );
      const newSudent = await Student.findByIdAndUpdate(
        { _id: findclass.student_id },
        { $set: { class: searClass._id } },
        { new: true, useFindAndModify: false })
      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        findclass, newSudent, updateClass
      });
    } else {
      const studentClass = await newStudentClass.save();
      const updateClass = await Class.findByIdAndUpdate(
        { _id: findStInCLass.class_id },
        { $push: { students: student._id } },
        { new: true, useFindAndModify: false }
      );
      const newSudent = await Student.findByIdAndUpdate(
        { _id: findStInCLass.student_id },
        { $set: { class: searClass._id } },
        { new: true, useFindAndModify: false })
      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        studentClass, newSudent, updateClass
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding  new data is failed" }] });
  }
};
//  Add student to class
const addStudenttoClass = async (req, res) => {
  const { id, student } = req.params;
  const StClInfo = req.body;
  try {
    const student = await Student.findOne({ firstName: req.params.student });
    const searClass = await Class.findOne({ _id: req.params.id });
    const newStudentClass = new StudentClass({
      class_id: searClass._id,
      students_id: [student._id],
      reg_date: StClInfo.reg_date,
      end_date: StClInfo.end_date,
    });
    const findStInCLass = await StudentClass.find({
      $and: [
        { class_id: newStudentClass.class_id },
        { students_id: newStudentClass.students_id },
      ],
    });
    const findclass = await StudentClass.findOne({
      class_id: newStudentClass.class_id,
    });
    if (!(findStInCLass.length === 0)) {
      res
        .status(201)
        .json({ errors: [{ msg: "Student already adeed to this class" }] });
    } else if (findclass) {
      findclass.students_id.push(newStudentClass.students_id);
      await findclass.save();
      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        findclass,
      });
    } else {
      const studentClass = await newStudentClass.save();
      res.status(200).json({
        errors: [{ msg: "Added successfully" }],
        studentClass,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding  new data is failed" }] });
  }
};

//Delete all data

const deleteallData = async (req, res) => {
  try {
    await StudentClass.remove({});

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
    await StudentClass.findByIdAndDelete(id);
    const StClassList = await StudentClass.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      StClassList: StClassList,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedData = await StudentClass.findByIdAndUpdate(id, req.body, {
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
    const resultList = await StudentClass.find(query);
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
  addClassStudent,
  getOnebytId,
  getAll,
  findData,
  deleteallData,
  addStudenttoClass,
  getStudentOneClass,
};
