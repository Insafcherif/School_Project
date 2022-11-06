const mongoose = require("mongoose");
const attendanceSchema = require("../SchemaModels/attendanceSchema");
const feeSchema = require("../SchemaModels/fessSchema");

//Add attendance for a student

const addAttendance = async (req, res) => {
  try {
    const attendanceModel = new attendanceSchema({
      _id: mongoose.Types.ObjectId(),
      student_id: req.body.student_id,
      date: req.body.date,
      attended: req.body.attended,
    });
    const attendance = await attendanceModel.save();
    res.status(200).json({
      errors: [{ msg: "attendance added" }],
      attendance,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding attendance is failed" }] });
  }
};

//Find attendance of a student

const findAttdnce = async (req, res) => {
  try {
    const result = await attendanceSchema.find({
      student_id: req.body.student_id,
      date: req.body.date,
    });
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "finding attendance  is failed" }] });
  }
};

//Find absences of a student
const findAbsence = async (req, res) => {
  try {
    const result = await attendanceSchema.find({ attended: false });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "finding absence  is failed" }] });
  }
};

//Add fee for a student for a term
const addFee = async (req, res) => {
  try {
    const feeModel = new feeSchema({
      _id: mongoose.Types.ObjectId(),
      student_id: req.body.student_id,
      term: req.body.term,
      year: req.body.year,
      feeStatus: req.body.feeStatus,
    });
    const fees = await feeModel.save();
    res.status(200).json({
      errors: [{ msg: "fee added" }],
      fees,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding fee is failed" }] });
  }
};

//update fee status

const updateFee = async (res, req) => {
  try {
    const searchedfee = await feeSchema.find({
      student_id: req.body.student_id,
      term: req.body.term,
      year: req.body.year,
    });
    if (!searchedfee) {
      res.status(404).json({ errors: [{ msg: "data is not found" }] });
    } else {
      searchedfee[0].feeStatus = req.body.feeStatus;
      await searchedfee[0].save();
      res.status(200).json({
        errors: [{ msg: "updating fee status is succesfully" }],
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "updating fee status is failed" }] });
  }
};

module.exports = { updateFee, addFee, findAbsence, findAttdnce, addAttendance };
