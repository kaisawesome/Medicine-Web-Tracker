const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const medicineSchema= new Schema({
    drugName:{
        type:String,
        required:true
    },
    dosage:{
        type:String,
        required:true
    },
    frequency:{
        type:String,
        required:true
    }
}, { timestamps:true });

const medicines=mongoose.model('medicines',medicineSchema);
module.exports=medicines;
