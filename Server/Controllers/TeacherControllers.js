const Teacher = require("../Models/Teacher");

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (teachers.length === 0) {
      res.status(201).json({ errors: [{ msg: "your data base is empty" }] });
    } else {
      res.status(400).json({ teachers: teachers });
    }
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "server failed" }] });
  }
};
const getOneTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedTeacher = await Teacher.findOne({ _id: id });
    if (!searchedTeacher) {
      return res.status(101).json({ errors: [{ msg: "Teacher not found" }] });
    } else {
      res.status(200).json({ user: searchedTeacher });
    }
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Operation is failed" }] });
  }
};

const addTeacher = async (req, res) => {
  const teacherInfo = req.body;
  try {
    const newTeacher = new Teacher({
      firstName: teacherInfo.firstName,
      lastName: teacherInfo.lastName,
      age: teacherInfo.age,
      email: teacherInfo.email,
      password: teacherInfo.password,
      gender: teacherInfo.gender,
      role: teacherInfo.role,
      Phone: teacherInfo.phone,
      image: req.file.filename,
      address: teacherInfo.address,
      bio: teacherInfo.bio,
      date_of_birth: teacherInfo.date_of_birth,
      contactType: teacherInfo.contactType,
      ContactDate: teacherInfo.ContactDate,
      subject: teacherInfo.subject,
      empolyee_id: teacherInfo.empolyee_id,
    });
    const teachers = await Teacher.find();
    const searchedTeacher = teachers.find(
      (elt) => elt.email == teacherInfo.email
    );
    if (!searchedTeacher) {
      await newTeacher.save();
      res.status(200).json({
        teacher: newTeacher,
      });
    } else {
      res.status(201).json({ errors: [{ msg: "user already exist" }] });
    }
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "server failed" }] });
  }
};

const deleteTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    await Teacher.findByIdAndDelete(id);
    const teachers = await Teacher.find();
    res
      .status(200)
      .json({ msg: "delete is succesfully done", teachers: teachers });
  } catch (error) {
    res.status(400).json({ msg: "delete teacher is failed" });
  }
};
const updateteacher = async (req, res) => {
  const id = req.params.id;
  const teacherInfo = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacherInfo, {
      new: true,
    });

    const teachers = await Teacher.find();
    res
      .status(200)
      .json({ msg: "update teacher is succesfully", updatedTeacher });
  } catch (error) {
    res.status(400).json({ msg: "update teacher is failed" });
  }
};

module.exports = {
  getAllTeachers,
  addTeacher,
  getOneTeacher,
  deleteTeacher,
  updateteacher,
};
