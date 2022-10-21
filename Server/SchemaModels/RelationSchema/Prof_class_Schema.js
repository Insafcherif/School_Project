const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    class_id: {
        type: String,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
});


module.exports = mongoose.model("Prof_Class", schema);
