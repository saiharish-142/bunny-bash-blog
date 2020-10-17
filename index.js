const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();
app.use(cors())
app.use(express.json())
const { MONGOURI } = require('./config/keys');

mongoose.connect(MONGOURI,{useNewUrlParser: true,useFindAndModify:false, useUnifiedTopology: true})
mongoose.connection.on('connected', () =>{
    console.log("connected to mongo yeah!!")
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connection',err)
})

require('./models/blog.model')
require('./models/user.model')
require('./models/category.model')

app.use('/blog',require('./routes/blogs.routes'))
app.use('/category',require('./routes/category.routes'))
app.use('/auth',require('./routes/users.routes'))

// function errHandler(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//       res.json({
//         success: 0,
//         message: err.message
//       })
//   }
// }

// app.get('/',(req,res)=>{
//     console.log(req.originalUrl)
// })

// app.use('/blogImg',express.static("upload/blogs"))
// app.use(errHandler);

app.listen(process.env.PORT || 4000, () => console.log('Srever has started......'))