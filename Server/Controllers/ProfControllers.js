const mongoose = require("mongoose");
const Prof = require("../SchemaModels/ProfSchema");
const bcrypt = require("bcryptjs");
const tokenSchema = require("../SchemaModels/token_Schema");
const authSchema = require("../SchemaModels/auth_Schema");
const meetingSchema = require("../SchemaModels/MeetingSchema");

//Get all professors

const getAllProfs = async (req, res) => {
  try {
    const resultList = await tokenSchema.find({ token: req.token });
    if (resultList.length < 1) {
      res.status(401).json({ error: [{ message: "Invalid Token" }] });
    }
    const profs = await Prof.find();
    if (profs.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ profs: profs });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all professors is failed" }] });
  }
};

//Get professor By ID

const getOneProfById = async (req, res) => {
  const id = req.params.id;
  try {
    const resultList = await tokenSchema.find({ token: req.token });
    if (resultList.length < 1) {
      res.status(401).json({ error: [{ message: "Invalid Token" }] });
    }
    const searchedProf = await Prof.findOne({ _id: id });
    if (!searchedProf) {
      return res.status(101).json({ errors: [{ msg: "ID not found" }] });
    } else {
      res.status(200).json({ prof: searchedProf });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "getting one professor is failed" }] });
  }
};

//add new professor

const addProf = async (req, res) => {
  const profInfo = req.body;
  try {
    const resultList = await tokenSchema.find({ token: req.token });
    if (resultList.length < 1) {
      res.status(401).json({ error: [{ message: "Invalid Token" }] });
    }
    const hashedPasword = await bcrypt.hash(profInfo.password, 10);
    const newObjectID = mongoose.Types.ObjectId();
    const newProf = new Prof({
      id: newObjectID,
      nic: profInfo.nic,
      firstName: profInfo.firstName,
      lastName: profInfo.lastName,
      age: profInfo.age,
      email: profInfo.email,
      password: hashedPasword,
      gender: profInfo.gender,
      role: "Professor",
      Pict: profInfo.Pict,
      Phone: profInfo.Phone,
      address: profInfo.address,
      bio: profInfo.bio,
      date_of_birth: profInfo.date_of_birth,
      contactType: profInfo.contactType,
      ContactDate: profInfo.ContactDate,
      subject: profInfo.subject,
      empolyee_id: profInfo.empolyee_id,
      access_level_id: profInfo.access_level_id,
    });
    const newAuthModel = new authSchema({
      user_id: newObjectID,
      UserName: profInfo.UserName,
      phone: profInfo.phone,
      user_role: "Professor",
      password_hash: hashedPasword,
    });

    const profs = await Prof.find();
    const searchedProf = profs.find((elt) => elt.nic == profInfo.nic);
    if (searchedProf) {
      res.status(201).json({ errors: [{ msg: "professor already exist" }] });
    } else {
      await newAuthModel.save();
      await newProf.save();
      res.status(200).json({
        error: [{ message: "New professor added successfully" }],
        prof: newProf,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "Adding a new professor is failed!" }] });
  }
};

//Delete professor

const deteleProf = async (req, res) => {
  const id = req.params.id;
  try {
    const resultList = await tokenSchema.find({ token: req.token });
    if (resultList.length < 1) {
      res.status(401).json({ error: [{ message: "Invalid Token" }] });
    }
    await Prof.findByIdAndDelete(id);
    const profs = await Prof.find();
    res
      .status(200)
      .json({ errors: [{ msg: "delete is succesfully done" }], profs: profs });
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "deleting a professor is failed!" }] });
  }
};

//Update professor

const updateProf = async (req, res) => {
  const id = req.params.id;
  const profInfo = req.body;
  try {
    const resultList = await tokenSchema.find({ token: req.token });
    if (resultList.length < 1) {
      res.status(401).json({ error: [{ message: "Invalid Token" }] });
    }
    const updateProf = await Prof.findByIdAndUpdate(id, profInfo, {
      new: true,
    });

    const profs = await Prof.find();
    res.status(200).json({
      errors: [{ msg: "Updating a professor is succesfully" }],
      updateProf,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "Updating a professor is failed" }] });
  }
};

//find professors my name

const findProf = async (req, res) => {
  const name = req.body.name;
  try {
    const query = {};
    query[name] = { $regex: req.body.value };
    const resultList = await Prof.find(query);
    if (!resultList) {
      return res.status(101).json({ errors: [{ msg: "Name not found" }] });
    } else {
      res.status(200).json({ resultList });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Finding professors is failed" }] });
  }
};

// Professor schedules a parent meeting

const schedulMeeting = async (req, res) => {
  const neetingInfo = req.body;
  try {
    const resultList = await tokenSchema.find({ token: req.token });
    if (resultList.length < 1) {
      res.status(401).json({ error: [{ message: "Invalid Token" }] });
    }
    const meetingModel = new meetingSchema({
      _id: mongoose.Types.ObjectId(),
      professor_id: req.professor_id,
      parent_ids: [req.parent_id],
      date: neetingInfo.date,
    });
    await meetingModel.save();
    res.status(200).json({
      errror: [{ message: "Parent-Teacher meeting added successfully" }],
      meetingModel,
    });
  } catch (error) {
    res.status(500).json({
      errors: [{ msg: "Adding a new Parent-Teacher meeting is failed" }],
    });
  }
};

module.exports = {
  getAllProfs,
  getOneProfById,
  addProf,
  deteleProf,
  updateProf,
  findProf,
  schedulMeeting,
};
