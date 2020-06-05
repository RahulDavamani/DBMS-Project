const mongoose = require('mongoose')
var workerSchema = new mongoose.Schema({
   id: String,
   ssnNumber: Number,
   fName: String,
   mName: String,
   lName: String,
   dob: Date,
   address: String,
   phone: Number,
   email: String,
   position: String,
   salary: Number,
   adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
   }
});

module.exports = mongoose.model("Worker", workerSchema);