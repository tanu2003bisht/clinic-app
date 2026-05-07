const express = require('express');
const router = express.Router()
const Medicine = require('./../models/medicine');

router.post('/',async(req,res) =>{
    try{
    const data = req.body;
    const newMedicine = new Medicine(data);
    const response = await newMedicine.save();
    console.log('data of medicine saved');
    res.status(201).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

router.get('/',async(req,res) =>{
    try{
        const response = await Medicine.find();
        console.log('medicine data fetched');
        res.status(201).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

router.get('/:category',async(req,res) =>{
    try{
        const category = req.params.category;
        if(category === 'antibiotic' || category === 'painkiller' || category === 'supplement'){
            const response = await Medicine.find({category:category});
        if(!response)
            return res.status(404).json({error:'invalid category'})
        console.log('category found');
        res.status(201).json(response);
}else{
        res.status(404).json({message:'invalid category'});
}
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})

router.put('/:id',async(req,res) =>{
    try{
        const medicineID = req.params.id;
        const updateMedicineID = req.body;
        const response = await Medicine.findByIdAndUpdate
        (medicineID,updateMedicineID,{
            new: true,
            runValidators: true
        })
        if(!response)
            return res.status(404).json({error:'invalid id to update'})
        console.log('medicine data updated');
        res.status(201).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'});
    }
})


router.delete('/:id',async(req,res) =>{
    try{
    const medicineID = req.params.id;
    const response = await Medicine.findByIdAndDelete(medicineID);
    if(!response)
        return res.status(404).json({error:'invalid id'});
    console.log('medicine data deleted successfully')
    console.log('data deleted');
    res.status(201).json({message:'medicine data deleted successfully'})
}catch(err){
    console.log(err);
    res.status(500).json({message:'internal server error'});
}
})

module.exports = router;