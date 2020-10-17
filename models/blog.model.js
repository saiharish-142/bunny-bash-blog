const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const linktextSchema = new mongoose.Schema({
    text:{type:String},
    link:{type:String}
},{_id:false})

// const string = new mongoose.Schema({
//     {type:String}
// },{_id:false})

const blogSchema = new mongoose.Schema({
    title:{type:String, required:true},
    category:{type:String, required:true},
    subtitle:[{type:String}],
    imgurl:{type:String, required:true},
    altimg:{type:String,required:true},
    imgHypText:[linktextSchema],
    description:{type:String, required:true},
    bulletPoints:[{type:String}],
    links:[{type:String}],
    HypText:[linktextSchema],
    comments:[{text:{type:String}, by:{type:ObjectId ,ref:"User"}}]
},{timestamps:true})


mongoose.model('Blog',blogSchema)