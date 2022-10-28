const ProfSubject = require("../../SchemaModels/RelationSchema/Prof_Subject_Schema");
const Prof = require("../../SchemaModels/ProfSchema");
const Subject = require("../../SchemaModels/Subject_Schema");
const mongoose = require("mongoose");
//Get all

const getAll = async (req, res) => {
  try {
    const profSubjects = await ProfSubject.find()
      .populate("professor_id")
      .populate("subject_id");
    if (profSubjects.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ profSubjects: profSubjects });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all data is failed!" }] });
  }
};

//Get  By ID

const getOnebytId = async (req, res) => {
  const id = req.params.id;
  try {
    const searProfSubj = await ProfSubject.findOne({ _id: id });
    if (!searProfSubj) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ ProfSubject: searProfSubj });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one data is failed" }] });
  }
};

// Add SubjectProf

const AddSubjProf = async (req, res) => {
  const { id, subject } = req.params;
  const profSubjectInfo = req.body;
  try {
    const parent = await Prof.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    const subject = await Subject.findOne({ subject: req.params.subject });

    const newProfSubj = new ProfSubject({
      professor_id: parent._id,
      subject_id: subject._id,
      start_date: profSubjectInfo.start_date,
      end_date: profSubjectInfo.start_date,
    });
    await newProfSubj.save();
    res.status(200).json({
      errors: [{ msg: "Added successfully" }],
      newProfSubj: newProfSubj,
    });
  } catch (error) {}
};

//Delete data

const deleteData = async (req, res) => {
  const id = req.params.id;
  try {
    await ProfSubject.findByIdAndDelete(id);
    const profSubjects = await ProfSubject.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      profSubjects: profSubjects,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedData = await ProfSubject.findByIdAndUpdate(id, req.body, {
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
    const resultList = await ProfSubject.find(query);
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
  getOnebytId,
  getAll,
  findData,
  AddSubjProf,
};
