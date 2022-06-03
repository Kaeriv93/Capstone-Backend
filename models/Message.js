const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content:{
        type: String
    }
},{timestamps:true})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message