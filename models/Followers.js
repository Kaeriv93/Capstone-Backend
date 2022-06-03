const mongoose = require('mongoose')

const followersSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    count:{
        type: Number
    }
},{timestamps:true})

const Followers = mongoose.model('Followers', followersSchema)

module.exports = Followers