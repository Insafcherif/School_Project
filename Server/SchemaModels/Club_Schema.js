const mongoose=require('mongoose')

const Schema =  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    members: [],
    date: { type: Date, default: Date.now },
  });
  
 module.exports = mongoose.model("Club", Schema);
  