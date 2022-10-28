const mongoose = require("mongoose");
const Level = require("../../SchemaModels/levelSchema");
const Subject = require("../../SchemaModels/Subject_Schema");

// Get all level

const getAll = async (req, res) => {
  try {
    const alLevels = await Level.find().populate("subject_id");
    if (alLevels.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ alLevels: alLevels });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all data is failed!" }] });
  }
};
//add level data

const addSubjecttoLevel = async (req, res) => {
  try {
    const subjects = await Subject.find();
    const math = await Subject.findOne({ subjectdfName: "Math" });
    const arabic = await Subject.findOne({ subjectdfName: "Arabic" });
    const english = await Subject.findOne({ subjectdfName: "English" });
    const islamEduc = await Subject.findOne({
      subjectdfName: "Islamic Education",
    });
    const music = await Subject.findOne({ subjectdfName: "Music" });
    const InfoTech = await Subject.findOne({
      subjectdfName: "I.T (Information Technology)",
    });
    const artSub = await Subject.findOne({
      subjectdfName: "Art",
    });
    const science = await Subject.findOne({ subjectdfName: "Science" });
    const pysicEduc = await Subject.findOne({
      subjectdfName: "Physical Education",
    });
    const history = await Subject.findOne({
      subjectdfName: "History",
    });
    const chemistry = await Subject.findOne({
      subjectdfName: "Chemistry",
    });
    const geog = await Subject.findOne({
      subjectdfName: "Geography",
    });
    const physics = await Subject.findOne({
      subjectdfName: "Physics",
    });
    const socialEduc = await Subject.findOne({
      subjectdfName: "Social Education",
    });

    const newLevel = new Level({
      levelNumber: 6,
      levelPrice: 6000,
      subject_id: [
        math._id,
        arabic._id,
        english._id,
        islamEduc._id,
        music._id,
        InfoTech._id,
        artSub._id,
        pysicEduc._id,
        science._id,
        geog._id,
        history._id,
        socialEduc._id,
        physics._id,
        chemistry._id,
      ],
    });

    await newLevel.save();
    res.status(200).json({
      errors: [{ msg: "Added successfully" }],
      newLevel: newLevel,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Adding  new data is failed" }] });
  }
};

//Delete data

const deleteallData = async (req, res) => {
  try {
    await Level.remove({});
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
    await Level.findByIdAndDelete(id);
    const Levels = await Level.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      Levels: Levels,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedData = await Level.findByIdAndUpdate(id, req.body, {
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
    const resultList = await Level.find(query);
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
  addSubjecttoLevel,
  getAll,
  deleteallData,
  deleteData,
  findData,
  updateData,
};
