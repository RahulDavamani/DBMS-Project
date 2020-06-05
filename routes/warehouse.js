var express     = require("express"),
    router      = express.Router(),
    Warehouse   = require("../models/warehouse");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Warehouse.find({}, function(err, warehouses){
         if(err){
            console.log(err)
         }
         else{
            res.render('../views/warehouse/warehouse.ejs', {warehouses})
         }
     })
   }else {
      res.redirect('/admin/login')
   }
});

module.exports = router;
