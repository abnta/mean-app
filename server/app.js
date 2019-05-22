const express = require('express');

const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const connectionString = require('./connection')()
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.router')

console.log(connectionString)

mongoose.connect(connectionString)
    .then(function(){
        console.log('Successful connection')
    })
    .catch(function(){
        console.log('Error in Connection')
    })

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use((req,res,next)=>{
    console.log('server is listening to requests')
    next()
})



app.use('/api/user',userRouter);

app.use('/api/auth',authRouter);


module.exports = app