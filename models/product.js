const mongoose = require('mongoose')
var productSchema = new mongoose.Schema({
   id: String,
   pName: String,
   quantity: Number,
   price: Number,
   expDate: Date,
   adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
   },
   warehouse: {
      type: String
   },
   machines: [
      {
         type: String
      }
   ]
});

module.exports = mongoose.model("Product", productSchema);