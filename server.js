const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/',async(req,res) =>{
    res.send('welcome to our clinic how can i help you!');
})

const doctorRoutes = require('./routes/doctorRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

app.use('/doctor', doctorRoutes);
app.use('/medicine',medicineRoutes);

app.listen(PORT,()=>{
    console.log('the localhost is running');
})