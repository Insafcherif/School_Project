const mongoose = require("mongoose");

const HomeWorkschema = new mongoose.Schema({
    class_id: {
        type: String
    },
    subject_id: {
        type: String
    },
    file_id: {
        type: String
    },
    file_extension: {
        type: String
    },
    date: {
        type: Date
    }
});

 
module.exports = mongoose.model("HomeWork", HomeWorkschema);
