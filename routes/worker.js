var express     = require("express"),
    router      = express.Router(),
    Worker       = require("../models/worker");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Worker.find({}, function(err, workers){
         if(err){
            console.log(err)
         }
         else{
            res.render('../views/worker/worker.ejs', {workers})
         }
     })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   res.render("../views/worker/add.ejs")
})

router.post("/", (req, res) => {
   const { fName, mName, lName, dob, address, phone, email, position, salary } = req.body
   if(phone.length != 10){
      res.locals.current.error = 'Invalid Phone Number'      
      return res.redirect('/worker/add')
   }
   // if(!validator.isEmail(email)){
   //    res.locals.current.error = 'Invalid Email'
   //    return res.redirect('/worker/add')
   // }
   Worker.findOne({email})
      .then(worker =>{
         if(worker){
            return res.redirect('/worker')
         }
         const adminId = res.locals.current.admin._id;
         const newCus = new Worker ({
            fName, mName, lName, dob, address, phone, email, position, salary, adminId
         })
         newCus.save()
            .then(worker => res.redirect('/worker'))
            .catch(err => console.log(err))
      })
})

router.post('/delete', (req, res) => {
   const {wid} = req.body;
   Worker.findByIdAndRemove(wid, (err) => {
      if(err){
          console.log(err);
      }else{
          res.redirect("/worker");
      }
  });
})

module.exports = router;
