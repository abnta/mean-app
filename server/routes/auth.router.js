const express = require('express')

const router = express.Router();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const User = require('./../models/user.model');

router.post('/signup/',(req,res,next)=>{
    console.log(req.body);
    var userDetails = null
    User.findOne({email:req.body.email})
        .then((response)=>{
            console.log(response);
            userDetails=response;
            bcrypt.hash(req.body.password, 10).then((hash)=>{
                const user = new User({
                    _id:userDetails._id,
                    name:userDetails.name,
                    email:userDetails.email,
                    githubRepo:userDetails.githubRepo,
                    age:userDetails.age,
                    gender:userDetails.gender,
                    about:userDetails.about,
                    dob:new Date(userDetails.dob),
                    password:hash,
                    role:req.body.role
                })
                User.findByIdAndUpdate(userDetails._id,user)
                .then((signupResponse)=>{
                    console.log(signupResponse)
                    res.status(200).json({message:'success',data:signupResponse,error:null})
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json({message:'failure',data:null,error:'error in sign up'})
                })

            }).catch((err)=>{
                console.log(err)
                res.status(400).json({message:"failure",data:null,error:'error in sign up'})
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json({message:"failure",data:null,error:'error in sign up, first create the user the sign up'})
        })
    
})

router.post('/login/',(req,res,next)=>{
    let fetchedUser = null;
    User.findOne({
        email:req.body.email
    }).then(user =>{
        if(!user){
            console.log('1')
          return res.status(401).json({
                message:'failure',data:null,error:'enter valid email or password'
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then((result)=>{
        if(!result){
            console.log('2')
           return res.status(401).json({
                message:'failure',
                data:null,
                error:'enter valid email or password'
            })
        }
        const token=jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},
            'secret_protexted',
            {expiresIn:'1h'});
        res.status(200).json({ message:'success',data:{
            token:token,
            expiresIn:3600,
            _id:fetchedUser._id,
            role:fetchedUser.role
        },error:null
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(401).json({
            message:'failure',
            data:null,
            error:'enter valid email or password'
        })
    })
})

module.exports = router