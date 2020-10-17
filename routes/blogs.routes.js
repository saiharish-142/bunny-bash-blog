const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Blog = mongoose.model('Blog')
const authent = require('../auth/auth')
const adminAuthent = require('../auth/adminauth')

router.get('/',(req,res)=>{
    Blog.find() 
    // .select('HypText._id')
    // .select({path:'HypText',select:'-_id'})
    .populate('comments.by','-password')
    .then(result => {res.json(result)})
    .catch(err => res.status(400).json({error:"something went wrong",err}))
})

router.get('/:id',(req,res)=>{
    Blog.find({_id:req.params.id}) 
    .populate('comments.by','-password')
    .then(result => {res.json(result)})
    .catch(err => res.status(400).json({error:"something went wrong",err}))
})

router.post('/addBlog',adminAuthent,(req,res)=>{
    const {title, altimg,  subtitle, imgurl, category, imgHypText, description, links, bulletPoints, HypText} = req.body
    if(!title || !category || !description || !links){
        return res.status(422).json({error: 'enter all fields'})
    }
    const blog = new Blog({
        title,
        subtitle,
        category,
        imgurl,
        imgHypText,
        description,
        altimg,
        bulletPoints,
        links,
        HypText
    })
    blog.save()
    .then(result=> {
        res.json({result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/update/:id',adminAuthent, (req,res) =>{
    const id = req.params.id
    Blog.findOne({_id:id})
    .then(blog => {
        if(req.body.title){blog.title = req.body.title}
        if(req.body.altimg){blog.altimg = req.body.altimg}
        if(req.body.imgurl){blog.imgurl = req.body.imgurl}
        if(req.body.category){blog.category = req.body.category}
        if(req.body.subtitle){
            if(req.body.subtitle.length){blog.subtitle = req.body.subtitle}
        }
        if(req.body.imgHypText){
            if(req.body.imgHypText.length){blog.imgHypText = req.body.imgHypText}
        }
        if(req.body.description){blog.description = req.body.description}
        if(req.body.bulletPoints){
            if(req.body.bulletPoints.length){blog.bulletPoints = req.body.bulletPoints}
        }
        if(req.body.links){
            if(req.body.links.length){blog.links = req.body.links}
        }
        if(req.body.HypText){
            if(req.body.HypText.length){blog.HypText = req.body.HypText}
        }
        blog.save()
        .then(result=>{
            res.json({result})
        })
        .catch(err => console.log(err))
    })
})

router.put('/comment',authent,(req,res)=>{
    const comment={
        text:req.body.text,
        by:req.user
    }
    Blog.findByIdAndUpdate(req.body.blogId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate({path:"comments",populate:{path:"by",select:"-password"}})
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/delete/:id',adminAuthent,(req,res)=>{
    Blog.deleteOne({_id:req.params.id})
    .exec((err,blog)=>{
        if(err || !blog){
            return res.status(422).json({error:err})
        }
        Blog.remove()
        .then(result=>{
            res.json({result})
        })
        .catch(err => console.log(err))
    })
})

module.exports = router