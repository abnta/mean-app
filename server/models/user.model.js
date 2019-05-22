const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    githubRepo:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
})

module.exports = mongoose.model('User',userSchema);