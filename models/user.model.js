const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    type:{type:String}
})

mongoose.model('User',userSchema)