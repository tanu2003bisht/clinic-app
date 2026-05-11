const mongoose = require('mongoose');
require('dotenv').config()

const mongoUrl = process.env.MONGO_URL_LOCAL;
//const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on('connected', () =>{
    console.log('mongoose connected');
})

db.on('error' ,(err) =>{
    console.log('error',err);
})

db.on('disconnected',() =>{
    console.log('mongoose disconnected');
})

module.exports = db;