const mongoose = require('mongoose')
var departmentSchema = new mongoose.Schema({
   id: String,
   dName: String,
   product: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product'
      }
   ]
});

module.exports = mongoose.model("Department", departmentSchema);