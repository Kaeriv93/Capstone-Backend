const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        default:"https://i.imgflip.com/1gqvcu.jpg"
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
        type: String,
        default:""
    },
    from:{
        type: String,
        default:""
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

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error("incorrect password")
    }
    throw Error('incorrect Email')
}

const User = mongoose.model('User', userSchema)

module.exports = User