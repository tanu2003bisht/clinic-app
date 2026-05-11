const express = require('express');
const router = express.Router();
const Doctor = require('./../models/doctor');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

router.post('/signup', async(req,res) =>{
    try{
    const data = req.body;
    const newDoctor = new Doctor(data);
    const response = await newDoctor.save();
    console.log('data saved');

    const payload = {
        id: response.id,
        username: response.username
    }
    console.log(JSON.stringify(payload));

    const token = generateToken(response.username);
    console.log('token is:' , token);

    res.status(201).json({response:response,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

//login route
router.post('/login',async(req,res) =>{
    try{
        //extract username and password
        const {username,password} = req.body;
        //find the user by username
        const user = await Doctor.findOne({username:username})
        //if user or password does  not exit return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'})
        }

        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        //return token as response
        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

//profile
router.get('/profile',jwtAuthMiddleware,async(req,res) =>{
    try{
        const userData = req.user;
        console.log('user data:',userData);

        const userId = userData.id;
        const user = await Doctor.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})
router.get('/', jwtAuthMiddleware,async(req,res) =>{
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
    const doctorId = req.params.id;
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