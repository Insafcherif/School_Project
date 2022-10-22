const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("token", schema);

