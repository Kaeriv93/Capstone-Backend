const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'first name is required']
    },
    lastName:{
        type:String,
        required:[true, 'last name is required']
    },
    username:{
        type:String,
        required:[true, 'username is required'],
        unique: true
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    avatar:{
        type:String,
        default:'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
    },
    description:{
        type:String,
        default:'Tell us about yourself'
    },

    birthdate:{
        type: Date
    },
 blog:{
        type: mongoose.Types.ObjectId,
        ref:'Blog'
    },
    posts:{
        type: mongoose.Types.ObjectId,
        ref: 'Posts'
    },
    socials:[{
        type:String,
        default:['Twitter','Instagram','Linkedin']
    }],
    followers:{
        type: mongoose.Types.ObjectId,
        ref: 'Followers'
    },
    message:{
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User