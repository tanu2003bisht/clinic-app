const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        enum: ['antibiotic','painkiller','supplement'],
        required: true
    },
    is_tablet:{
        type: Boolean,
        required: true
    }
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;