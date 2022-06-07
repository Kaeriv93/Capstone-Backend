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
    coverPicture:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:'Tell us about yourself'
    },

    birthdate:{
        type: Date
    },
    blog:[{
        type: mongoose.Types.ObjectId,
        ref:'Blog'
    }],
    followers:{
        type:Array,
        default:[],
    },
    city:{
        type: String
    },
    from:{
        type: String
    },
    followings:{
        type: Array,
        default: [],
    },
    message:[{
        type: mongoose.Types.ObjectId,
        ref: 'Message'
    }]
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User