var express     = require("express"),
    router      = express.Router(),
    Raw       = require("../models/raw");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Raw.find({}, function(err, raws){
         if(err){
            console.log(err)
         }
         else{
            res.render('../views/raw/raw.ejs', {raws})
         }
     })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   res.render("../views/raw/add.ejs")
})

router.post("/", (req, res) => {
   const { rName, quantity, price, expDate } = req.body
   Raw.findOne({rName})
      .then(raw =>{
         const newRaw = new Raw ({
            rName, quantity, price, expDate
         })
         newRaw.save()
            .then(raw => res.redirect('/raw'))
            .catch(err => console.log(err))
      })
})

module.exports = router;
