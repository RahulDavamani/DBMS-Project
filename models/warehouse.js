const mongoose = require('mongoose')
var warehouseSchema = new mongoose.Schema({
   id: String,
   wName: String,
   wSize: Number,
   address: String
});

module.exports = mongoose.model("Warehouse", warehouseSchema);