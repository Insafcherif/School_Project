const Prof = require("../SchemaModels/ProfSchema");
const bcrypt = require("bcryptjs");

const getAllProfs = async (req, res) => {
  try {
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
const getOneProf = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedProf = await Prof.findOne({ _id: id });
    if (!searchedProf) {
      return res.status(101).json({ errors: [{ msg: "professor not found" }] });
    } else {
      res.status(200).json({ prof: searchedProf });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "getting one professor is failed" }] });
  }
};
const addProf = async (req, res) => {
  const profInfo = req.body;
  try {
    const hashedPasword = await bcrypt.hash(profInfo.password, 10);
    const newProf = new Prof({
      firstName: profInfo.firstName,
      lastName: profInfo.lastName,
      age: profInfo.age,
      email: profInfo.email,
      password: hashedPasword,
      gender: profInfo.gender,
      Pict: profInfo.Pict,
      Phone: profInfo.Phone,
      address: profInfo.address,
      role: profInfo.role,
      bio: profInfo.bio,
      date_of_birth: profInfo.date_of_birth,
      contactType: profInfo.contactType,
      ContactDate: profInfo.ContactDate,
      subject: profInfo.subject,
      empolyee_id: profInfo.empolyee_id,
    });
    const profs = await Prof.find();
    const searchedProf = profs.find((elt) => elt.email == profInfo.email);
    if (searchedProf) {
      res.status(201).json({ errors: [{ msg: "professor already exist" }] });
    } else {
      await newProf.save();
      res.status(200).json({ prof: newProf });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "add professor is failed" }] });
  }
};
const deteleProf = async (req, res) => {
  const id = req.params.id;
  try {
    await Prof.findById(id);
    const profs = await Prof.find();
    res
      .status(200)
      .json({ errors: [{ msg: "delete is succesfully done" }], profs: profs });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "delete professor is failed" }] });
  }
};
const updateProf = async (req, res) => {
  const id = req.params.id;
  const profInfo = req.body;
  try {
    const updateProf = await Prof.findByIdAndUpdate(id, profInfo, {
      new: true,
    });

    const profs = await Prof.find();
    res
      .status(200)
      .json({
        errors: [{ msg: "update professor is succesfully" }],
        updateProf,
      });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "update professor is failed" }] });
  }
};

module.exports = {
  getAllProfs,
  getOneProf,
  addProf,
  deteleProf,
  updateProf,
};
