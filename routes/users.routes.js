const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')

router.post('/signup',(req,res)=>{
    const {username, password, type} = req.body
    User.find({username:username})
    .then(result => {
        if(result.length){
            return res.json({error: "user already exists",result})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                username,
                password:hashedpassword,
                type
            })
            user.save()
            .then(user => {
                const token = jwt.sign({_id:user._id},JWT_SECRET)
                user.password = undefined
                res.json({message: 'registered successfuly',user,token})
            })
            .catch(err => console.log(err))
        })
    })
})

router.post('/signin',(req,res)=>{
    const {username, password} = req.body
    User.find({username:username})
    .then(user =>{
        if(!user){
            return res.json({error: 'enter correct username or password'})
        }
        console.log(user.password)
        console.log(password)
        bcrypt.compare(password,user[0].password)
        .then(doMathch => {
            if(!doMathch){
                return res.json({error: 'enter correct username or password'})
            }
            console.log(user)
            const token = jwt.sign({_id:user[0]._id},JWT_SECRET)
            // console.log(JWT_SECRET,token)
            user.password= undefined
            const ossu = jwt.decode(token,JWT_SECRET)
            res.json({message:"logged in successfully",user,ossu,token})
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/passwordReset',(req,res)=>{
    const {username,oldPassword,newPassword} = req.body
    User.find({username:username})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:'cant change password'})
        }
        bcrypt.compare(oldPassword,user.password)
        .then(doMatch=>{
            if(doMatch){
                bcrypt.hash(newPassword,12)
                .then(hashedpassword=>{
                    user.password = hashedpassword
                    user.save()
                    .then(result => {
                        result.password = undefined
                        res.json({message: 'registered successfuly',result})
                    })
                    .catch(err => console.log(err))
                })
            }
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
})

module.exports = router