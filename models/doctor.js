const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
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

doctorSchema.pre('save', async function (next) {
    try{
    const doctor = this;
    if(!doctor.isModified('password')) return ;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(doctor.password,salt);
    doctor.password = hashedPassword;
   
    }catch(err){
        return next(err);
    }
})

doctorSchema.methods.comparePassword = async function(candidatePassword) {
    try{ 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;