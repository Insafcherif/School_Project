const mongoose = require("mongoose");
const Student = require("../SchemaModels/StudentSchema");
const bcrypt = require("bcryptjs");
const tokenSchema = require("../SchemaModels/token_Schema");
const authSchema = require("../SchemaModels/auth_Schema");

//Get all Students

const getAllStudents = async (req, res) => {
  try {
    // const resultList = await tokenSchema.find({ token: req.token });
    // if (resultList.length < 1) {
    //   res.status(401).json({ error: [{ message: "Invalid Token" }] });
    // }
    const students = await Student.find();
    if (students.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ students: students });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all students is failed" }] });
  }
};

//Get Student By ID

const getOneStudentId = async (req, res) => {
  const id = req.params.id;
  try {
    // const resultList = await tokenSchema.find({ token: req.token });
    // if (resultList.length < 1) {
    //   res.status(401).json({ error: [{ message: "Invalid Token" }] });
    // }
    const searchedStudent = await Student.findOne({ _id: id });
    if (!searchedStudent) {
      return res.status(101).json({ errors: [{ msg: "Student not found" }] });
    } else {
      res.status(200).json({ student: searchedStudent });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "getting one Student is failed" }] });
  }
};

//Add new Student

const addStudent = async (req, res) => {
  const studentInfo = req.body;
  try {
    // const resultList = await tokenSchema.find({ token: req.token });
    // if (resultList.length < 1) {
    //   res.status(401).json({ error: [{ message: "Invalid Token" }] });
    // }
    const hashedPasword = await bcrypt.hash(studentInfo.password, 10);
    const newObjectID = mongoose.Types.ObjectId();
    const newStudent = new Student({
      id: newObjectID,
      firstName: studentInfo.firstName,
      lastName: studentInfo.lastName,
      date_of_birth: studentInfo.date_of_birth,
      email: studentInfo.email,
      password: hashedPasword,
      gender: studentInfo.gender,
      role: "Student",
      Pict: studentInfo.Pict,
      Phone: studentInfo.Phone,
      addmision_year: studentInfo.addmision_year,
      Comment: studentInfo.Comment,
          });
    const newAuthModel = new authSchema({
      user_id: newObjectID,
      UserName: studentInfo.UserName,
      phone: studentInfo.phone,
      user_role: "Student",
      password_hash: hashedPasword,
    });
    const students = await Student.find();
    const searchedStudent = students.find(
      (elt) => elt.email == studentInfo.email
    );
    if (searchedStudent) {
      res.status(201).json({ errors: [{ msg: "Student already exist" }] });
    } else {
      await newAuthModel.save();
      await newStudent.save();
      res.status(200).json({
        errors: [{ msg: "New student added successfully" }],
        student: newStudent,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "Adding a new student is failed" }] });
  }
};

//Delete Student

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    // const resultList = await tokenSchema.find({ token: req.token });
    // if (resultList.length < 1) {
    //   res.status(401).json({ error: [{ message: "Invalid Token" }] });
    // }
    await Student.findByIdAndDelete(id);
    const students = await Student.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      students: students,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting a student is failed" }] });
  }
};

//Update Student

const updateStudent = async (req, res) => {
  const id = req.params.id;
  const studentInfo = req.body;
  try {
    // const resultList = await tokenSchema.find({ token: req.token });
    // if (resultList.length < 1) {
    //   res.status(401).json({ error: [{ message: "Invalid Token" }] });
    // }
    const updtedStudent = await Student.findByIdAndUpdate(id, studentInfo, {
      new: true,
    });
    res.status(200).json({
      errors: [{ msg: "updating student is succesfully" }],
      updtedStudent,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Updating a student is failed" }] });
  }
};

module.exports = {updateStudent, deleteStudent, addStudent, getOneStudentId, getAllStudents };
