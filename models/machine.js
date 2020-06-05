const mongoose = require('mongoose')
var machineSchema = new mongoose.Schema({
   id: String,
   mName: String,
   usage: String,
   raws: [
      {
         type: String
      }
   ],
   products: [
      {
         type: String
      }
   ]
});

module.exports = mongoose.model("Machine", machineSchema);