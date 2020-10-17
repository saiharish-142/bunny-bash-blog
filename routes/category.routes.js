const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Category = mongoose.model('Category')
const adminAuthent = require('../auth/adminauth')

router.post('/add',adminAuthent,(req,res)=>{
    const {category,description} = req.body
    Category.find({category:category})
    .then(result => {
        if(result.length){
            return res.status(422).json({error:"category alreay exists",result})
        }
        const catego = new Category({
            category,description
        })
        catego.save()
        .then(cate =>{
            res.json(cate)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/',(req,res)=>{
    Category.find() 
    .then(result => {res.json(result)})
    .catch(err => res.status(400).json({error:"something went wrong",err}))
})

router.get('/:id',(res,req)=>{
    Category.find({_id:req.params.id})
    .then(result=>{
        res.json(result)
    })
    .catch(err => console.log(err))
})

router.delete('/delete/:id',(res,req)=>{
    const id = req.params.id
    Category.find({_id:id})
    .then(result=>{
        if(!result){
            return res.json({error:"category not found"})
        }
        
    })
    .catch(err => console.log(err))
})

module.exports = router