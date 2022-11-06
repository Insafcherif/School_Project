const mongoose = require("mongoose");
const homeworkSchema = require("../SchemaModels/HomeWorkSchema");
const fs_for_mkdir = require("fs");
const path = require("path");

//Upload

const UploadHomeWork = async (req, res) => {
  const class_id = req.headers["class_id"];
  const session_id = req.headers["session_id"];
  const subject_id = req.headers["subject_id"];
  const upload_path = "./uploads/homework/" + class_id + "/" + subject_id + "/" + session_id;
  if (!fs_for_mkdir.existsSync("./uploads/homework/" + class_id)) {
    fs_for_mkdir.mkdirSync("./uploads/homework/" + class_id);
  }
  if (!fs_for_mkdir.existsSync(upload_path)) {
    fs_for_mkdir.mkdirSync(upload_path);
  }

  let fileStream;
  const newObjectID = mongoose.Types.ObjectId();
  req.pipe(req.busboy);
  req.busboy.on("file", function (fieldName, file, fileName) {
    const file_extension = path.extname(fileName);
    console.log("Uploading: " + fileName);
    //Path where homework will be uploaded
    fileStream = fs.createWriteStream(
      upload_path + "/" + newObjectID + file_extension
    );
    file.pipe(fileStream);
    fileStream.on("close", function () {
      const homeworkModel = new homeworkSchema({
        _id: newObjectID,
        class_id: class_id,
        subject_id: subject_id,
        file_id: fileName,
        file_extension: file_extension,
        date: new Date(),
      });
      homeworkModel.save().catch((err) => {
        console.log(err.message);
        res.status(500).json({
          error: err,
        });
      });
      console.log("Upload Finished of " + newObjectID + file_extension);
      return res.status(200).json({
        message: "Homework upload Success",
      });
    });
  });
};

// Download HomeWork 

const downloadHomeWork = async (req, res) => {
  const parent_id = req.headers["parent_id"];
  homeworkSchema
    .find({ _id: parent_id })
    .exec()
    .then((homeworkList) => {
      if (homeworkList.length < 1) {
        return res.status(401).json({
          message: "No such homework found!",
        });
      }
      const download_path =
        "./uploads/homework/" +
        homeworkList[0].class_id +
        "/" +
        homeworkList[0].subject_id +
        "/" +
        homeworkList[0].session_id +
        "/" + 
        parent_id +
        homeworkList[0].file_extension;
      res.download(download_path);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Get HomeWork 

const getHomeWork = async (req, res) => {
  homeworkSchema
    .find({ class_id: req.headers["class_id"] })
    .exec()
    .then((homeworkList) => {
      if (homeworkList.length < 1) {
        return res.status(401).json({
          message: "No such homework found!",
        });
      }
      res.json(homeworkList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  getHomeWork,
  downloadHomeWork,
  UploadHomeWork,
};
