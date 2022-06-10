const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        default:'629f8d7dd3bdfaf56f4259c0',
        required: true
    },
    content:{
        type:String
    },
    date:{
        type: Date
    },
    likes:{
        type: Array,
        default:[],
    },
    img:{
        type: String,
    }
},{timestamps:true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post