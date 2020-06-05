const mongoose = require('mongoose')
var adminSchema = new mongoose.Schema({
   id: String,
   username: String,
   password: String,
   products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product'
      }
   ],
   warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse'
   }
});


module.exports = mongoose.model("Admin", adminSchema);