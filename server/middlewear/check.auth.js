const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    try{
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,'secret_protexted');
        req.userData = {
            email:decodedToken.email,
            _id:decodedToken.userId
        }
        next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:'failed',data:null,error:'auth failed'})
    }
    
}