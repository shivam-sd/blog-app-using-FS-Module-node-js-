const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/userAuth");

const userschema = mongoose.Schema({
    username:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,
        // unique:true
    },
    age: {
        type:Number
    },
    password:{
        type:String,
        // required:true
    },
    profileimage:{
        type:String,
    }
});

userschema.plugin(plm);

module.exports = mongoose.model("user" , userschema);
