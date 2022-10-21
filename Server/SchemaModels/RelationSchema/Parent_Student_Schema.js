const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    parent_id: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    is_parent: {
        type: Boolean
    },
});

module.exports = mongoose.model("Parent_student", schema);
