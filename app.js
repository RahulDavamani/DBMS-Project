var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser")
    app             = express();
    PORT            = 5000;

var current = {
   customer: {},
   admin: {},
   error: ''
}

//Routes
var authRoutes = require('./routes/auth')
var productRoutes = require('./routes/product')
var workerRoutes = require('./routes/worker')
var warehouseRoutes = require('./routes/warehouse')
var rawRoutes = require('./routes/raw')
var machineRoutes = require('./routes/machine')
var departmentRoutes = require('./routes/department')

//Body Parser Config
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Mongoose init
mongoose.connect("mongodb+srv://rahuldavamani:Rahulmongo1@cluster0-jtegv.mongodb.net/Factory-Database?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.set("view engine", "ejs");

app.use(function(req, res, next){
   res.locals.current = current;
   next();
});

//Routes

app.use('/', authRoutes)
app.use('/', productRoutes)
app.use('/worker', workerRoutes)
app.use('/warehouse', warehouseRoutes)
app.use('/raw', rawRoutes)
app.use('/machine', machineRoutes)
app.use('/department', departmentRoutes)

app.listen(PORT, function(){
   console.log("The Blog Server Started");
})