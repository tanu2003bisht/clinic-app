const express = require('express');
const router = express.Router();
const Doctor = require('./../models/doctor');

router.post('/', async(req,res) =>{
    try{
    const data = req.body;
    const newDoctor = new Doctor(data);
    const response = await newDoctor.save();
    console.log('data saved');
    res.status(201).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

router.get('/', async(req,res) =>{
    try{
    const data = await Doctor.find();
    console.log('data fetched');
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'internal server error'});
    }

})

router.get('/:department',async(req,res) =>{
    try{
    const department = req.params.department; 
    if(department === 'cardio' || department === 'surgeon' || department === 'gyne'){
        const response = await Doctor.find({department:department});
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error:'invalid department'})
    }
}catch(err){
    console.log(err);
    res.status(500).json({message:'internal server error'});
}
})

router.put('/:id',async(req,res) =>{
    try{
    const doctorID = req.params.id;
    const updateID = req.body;
    const response = await Doctor.findByIdAndUpdate
    (doctorId,updateID,{
            new:true,
            runValidators:true
    })
    if(!response)
        return res.status(404).json({error:'doctor not found'})
    console.log('data updated');
    res.status(200).json(response);
}catch(err){
    console.log(err);
    res.status(500).json({message:'internal server error'});
}
})

router.delete('/:id',async(req,res) =>{
    try{
        const doctorId = req.params.id;
        const response = await Doctor.findByIdAndDelete(doctorId);
        if(!response)
            return res.status(404).json({error:'doctor not found'})
        console.log('data deleted');
        res.status(200).json({message:'doctor deleted successfully'})
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

module.exports = router;