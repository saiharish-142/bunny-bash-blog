const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config/keys")
const mongoose =require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    // console.log(token,JWT_SECRET)
    jwt.verify(token,JWT_SECRET,(err,payload) => {
        if(err){
            res.status(422).json({error:"you must be logged in"})
        }

        const {_id} = payload
        // console.log(payload)
        User.findById(_id).then(userData=>{
            req.user = userData
            // console.log(userData)
            if(userData.type!=='admin'){
                return res.status(422).json({error:"can not perform this activite"})
            }
            next()
        })
    })
}