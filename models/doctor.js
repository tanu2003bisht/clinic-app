const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    department:{
        type: String,
        enum: ['surgeon','cardio','gyne'],
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;