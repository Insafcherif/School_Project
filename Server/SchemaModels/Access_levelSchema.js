const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    level: {
        type: String
    },
    is_admin: {
        type: Boolean
    },
    created_date: {
        type: Date
    },

});


module.exports = mongoose.model("Accesslevel", schema);
