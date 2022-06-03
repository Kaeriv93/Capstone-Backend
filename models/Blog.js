const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    content:{
        type: String,
    },
    date:{
        type: Date
    },
    likes:{
        type: Number
    }
},{timestamps:true})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog