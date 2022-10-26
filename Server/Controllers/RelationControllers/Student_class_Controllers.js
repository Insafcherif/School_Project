const DataSchema = require("../../SchemaModels/RelationSchema/student_class_Schema");

//Get all

const getAll = async (req, res) => {
  try {
    const dataSchemas = await DataSchema.find();
    if (dataSchemas.length === 0) {
      res.status(201).json({ errors: [{ msg: "your database is empty" }] });
    } else {
      res.status(200).json({ dataSchemas: dataSchemas });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "get all data is failed!" }] });
  }
};

//Get  By ID

const getOnebytId = async (req, res) => {
  const id = req.params.id;
  try {
    const searchedData = await DataSchema.findOne({ _id: id });
    if (!searchedData) {
      return res.status(101).json({ errors: [{ msg: "Data not found" }] });
    } else {
      res.status(200).json({ dataSchema: searchedData });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "getting one data is failed" }] });
  }
};

//Add new data

const addNew = async (req, res) => {
  try {
    const newDataSchema = new DataSchema(req.body);
    const  dataSchema= await newDataSchema.save();
    res.status(200).json({
      errors: [{ msg: "Added successfully" }],
      dataSchema
    });
  } catch (error) {
    res
      .status(500)
      .json({ errors: [{ msg: "Adding  new data is failed" }] });
  }
};

//Delete data

const deleteData = async (req, res) => {
  const id = req.params.id;
  try {
 
    await DataSchema.findByIdAndDelete(id);
    const dataSchemas = await DataSchema.find();
    res.status(200).json({
      errors: [{ msg: "delete is succesfully done" }],
      dataSchemas: dataSchemas,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "deleting is failed" }] });
  }
};

//Update data

const updateData = async (req, res) => {
  const id = req.params.id;
    try {
     const updatedData = await DataSchema.findByIdAndUpdate(id, req.body, {
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
      const resultList = await DataSchema.find(query);
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
    updateData, deleteData, addNew, getOnebytId, getAll, findData
};
