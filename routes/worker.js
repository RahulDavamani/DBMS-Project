var express     = require("express"),
    router      = express.Router(),
    Worker       = require("../models/worker"),
    Admin       = require("../models/admin");

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
   Worker.findOne({email})
      .then(worker =>{
         if(worker){
            return res.redirect('/worker')
         }
         const admin = res.locals.current.admin._id;
         const newWorker = new Worker ({
            fName, mName, lName, dob, address, phone, email, position, salary, admin
         })
         
         Admin.findById(admin)
            .then(adm => {
               adm.workers.push(newWorker._id);
               adm.save()
                  .then(admin => {
                     newWorker.save()
                        .then(() => res.redirect('/worker'))
                  })
                  .catch(err => console.log(err))
            })
      })
})

router.post('/delete', (req, res) => {
   const admin = res.locals.current.admin;
   const {wid} = req.body;
   Worker.findByIdAndRemove(wid, (err) => {
      if(err){
         console.log(err);
      }else{
         Admin.findById(admin._id)
            .then(admin => {
               for (let i = 0; i < admin.workers.length; i++) {
                  if(admin.workers[i] == wid)
                     admin.workers.splice(i,1)
               }
               admin.save()
                  .then(res.redirect('/worker'));
            })
      }
  });
})

module.exports = router;
