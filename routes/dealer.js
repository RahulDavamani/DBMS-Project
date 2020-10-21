var express     = require("express"),
    router      = express.Router(),
    Dealer       = require("../models/dealer"),
    Warehouse = require("../models/warehouse");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Dealer.find({}, function(err, dealers){
         if(err){
            console.log(err)
         }
         else{
            res.render('../views/dealer/dealer.ejs', {dealers})
         }
     })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   res.render("../views/dealer/add.ejs")
})

router.post("/", (req, res) => {
   const admin = res.locals.current.admin
   const { dName, phone, location } = req.body
   Dealer.findOne({dName})
      .then(dealer => {
         const newDealer = new Dealer ({
            dName, phone, location
         })
         console.log(newDealer);
         newDealer.save()
            .then(dealer => res.redirect('/dealer'))
      })
})

module.exports = router;
