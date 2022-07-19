const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    fullname:{
        type : String,
        required:true,
        minlength:5,
        maxlenght:20,
        unique:true
    },
    username:{
        type : String,
        qequired:true,
        minlength:5,
        maxlenght:50,
        unique:true
    },
    password:{
        type : String,
        required:true,
        minlength:6
    },
    // tdlist: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'listtds'
    //         } 
    // ]
},
    { timestamps:true}
);
module.exports = mongoose.model("User",UserSchema)