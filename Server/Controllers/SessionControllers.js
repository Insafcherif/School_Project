const Session = require("../SchemaModels/SessionSchma");

//GET all sessions

const getAllSession = async (req, res) => {
  try {
    const session_list = await Session.find();
    if (session_list.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ session_list: session_list });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all sessions is failed" }] });
  }
};

//Get Single Session
const getOneSession = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedSession = await Session.findOne({ _id: id });
    if (!searchedSession) {
      return res.status(101).json({ errors: [{ msg: "session not found" }] });
    } else {
      res.status(200).json({ session: searchedSession });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "get one session is failed" }] });
  }
};

//Add one session

const addSession = async (req, res) => {
  const sessionInfo = req.body;
  try {
    const newSession = new Session({
      hoursSess: sessionInfo.hoursSess,
      DaySess: sessionInfo.DaySess,
      ClassSess: sessionInfo.ClassSess,
      Subject: sessionInfo.Subject,
      attendence: sessionInfo.attendence,
    });
    await newSession.save();
    res.status(200).json({ session: newSession });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "add session is failed" }] });
  }
};

//Update Session

const updateSession = async (req, res) => {
  const id = req.params.id;
  const sessionInfo = req.body;
  try {
    const updtSession = await Session.findByIdAndUpdate(id, sessionInfo, {
      new: true,
    });
    res.status(200).json({
      errors: [{ msg: "update session is succesfully" }],
      updtSession,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "update session is failed" }] });
  }
};

//delete session

const deteleSession = async (req, res) => {
  const id = req.params.id;
  try {
    await Session.findById(id);
    const Sessions = await Session.find();
    res
      .status(200)
      .json({
        errors: [{ msg: "delete is succesfully done" }],
        Sessions: Sessions,
      });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "delete session is failed" }] });
  }
};

module.exports = {
  getAllSession,
  getOneSession,
  addSession,
  updateSession,
  deteleSession,
};
