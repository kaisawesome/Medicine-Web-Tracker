const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserNameSchema= new Schema({
    email:{
        type:String,
        required:true
    }
}, {});

const medicines=mongoose.model('medicines',medicineSchema);
module.exports=medicines;