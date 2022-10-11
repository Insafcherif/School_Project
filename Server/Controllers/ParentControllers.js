const Parent = require("../Models/Parent");


const getAllParents = async (req, res) => {
  try {
    const Parents = await Parent.find();
    if (Parents.length === 0) {
      res.status(201).json({ errors: [{ msg: "your data base is empty" }] });
    } else {
      res.status(400).json({ Parents: Parents });
    }
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "server failed" }] });
  }
};
const getOneParent = async (req, res) => {
    const id = req.params.id;
    try {
      const searchedParent = await Parent.findOne({ _id: id });
      if (!searchedParent) {
        return res.status(101).json({ errors: [{ msg: "Parent not found" }] });
      } else {
        res.status(200).json({ user: searchedParent });
      }
    } catch (error) {
      res.status(400).json({ errors: [{ msg: "Operation is failed" }] });
    }
  };

const addParent = async (req, res) => {
  const ParentInfo = req.body;
  try {
    const newParent = new Parent({
      firstName: ParentInfo.firstName,
      lastName: ParentInfo.lastName,
      age: ParentInfo.age,
      email: ParentInfo.email,
      password: ParentInfo.password,
      gender: ParentInfo.gender,
      role:ParentInfo.role,
      Phone: ParentInfo.phone,
      image: req.file.filename,
      Job : ParentInfo.Job,
      Student: ParentInfo.Student,
     
    });
    const Parents = await Parent.find();
    const searchedParent = Parents.find(
      (elt) => elt.email == ParentInfo.email
    );
    if (!searchedParent) {
      await newParent.save();
      res.status(200).json({
        Parent: newParent,
      });
    } else {
      res.status(201).json({ errors: [{ msg: "user already exist" }] });
    }
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "server failed" }] });
  }
};

const deleteParent = async (req, res) => {
    const id = req.params.id;
    try {
      await Parent.findByIdAndDelete(id);
      const Parents = await Parent.find();
      res.status(200).json({ msg: "delete is succesfully done", Parents: Parents });
    } catch (error) {
      res.status(400).json({ msg: "delete Parent is failed" });
    }
  };
  const updateParent = async (req, res) => {
    const id = req.params.id;
    const ParentInfo = req.body;
    try {
      const updatedParent = await Parent.findByIdAndUpdate(id, ParentInfo, {
        new: true,
      });
  
      const Parents = await Parent.find();
      res.status(200).json({ msg: "update Parent is succesfully", updatedParent });
    } catch (error) {
      res.status(400).json({ msg: "update Parent is failed" });
    }
  };


module.exports = { getAllParents, addParent, getOneParent, deleteParent, updateParent};
