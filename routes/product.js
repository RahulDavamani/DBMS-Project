var express     = require("express"),
    router      = express.Router(),
    Product     = require("../models/product");
    Raw         = require("../models/raw")
    Machine     = require("../models/machine")
    Warehouse   = require("../models/warehouse")
    Admin       = require('../models/admin')

router.get("/", (req, res) => {
   Product.find()
      .then(async products => {
         const admins = []
         for (let i = 0; i < products.length; i++) {
            var admin = await Admin.findOne({_id: products[i].adminId})
            .then(admin => admin.username)
            admins.push(admin);
         }             
         res.render('../views/home', {products, admins})
      })
});

router.get("/add", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Warehouse.find({})
      .then(warehouses => {
         Machine.find({})
         .then(machines => {
            res.render("../views/add.ejs", {warehouses, machines})
         })   
      })
   }else {
      res.redirect('/admin/login')
   }
})

router.post("/", (req, res) => {
   const { pName, quantity, price, expDate, machines } = req.body

   const adminId = res.locals.current.admin._id;
   const warehouse = req.body.warehouse.split(' - ')[0]

   const machineNames = []
   if(machines){
      if(typeof machines == 'string'){
         machineNames.push(machines.split(' - ')[0])
      }else{
         for (let i = 0; i < machines.length; i++) {
            machineNames.push(machines[i].split(' - ')[0]);
         }
      }
   }

   Product.findOne({pName})
      .then(product =>{
         if(product){
            return res.redirect('/')
         }
         const newProduct = new Product ({
            pName, quantity, price, expDate, warehouse, adminId, machines: machineNames
         })
         
         newProduct.save()
            .then(product => res.redirect('/'))
            .catch(err => console.log(err))
      })
})

router.post('/delete', (req, res) => {
   const {pid} = req.body;
   Product.findByIdAndRemove(pid, (err) => {
      if(err){
          console.log(err);
      }else{
          res.redirect("/");
      }
  });
})

module.exports = router;
