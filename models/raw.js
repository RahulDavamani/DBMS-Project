const mongoose = require('mongoose')
var rawSchema = new mongoose.Schema({
   id: String,
   rName: String,
   quantity: Number,
   price: Number,
   expDate: Date
});

module.exports = mongoose.model("Raw", rawSchema);