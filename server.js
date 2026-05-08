const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db');
const passport = require('./auth');

app.use(express.json());

const PORT = process.env.PORT || 3000;

const logoRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}], request made to: ${req.originalUrl}`);
    next();
}

app.use(logoRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',async(req,res) =>{
    res.send('welcome to our clinic how can i help you!');
})

const doctorRoutes = require('./routes/doctorRoutes');
const medicineRoutes = require('./routes/medicineRoutes');


app.use('/doctor', localAuthMiddleware, doctorRoutes);
app.use('/medicine',medicineRoutes);

app.listen(PORT,()=>{
    console.log('the localhost is running');
})