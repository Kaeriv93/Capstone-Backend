const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String
    },
    date:{
        type: Date
    },
    likes:{
        type: Number
    }
},{timestamps:true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post