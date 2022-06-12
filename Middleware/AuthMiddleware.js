const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const createToken = (id) =>{
    return jwt.sign({id},'secret key',{
        expiresIn: maxAge,
    })
}

const user = await UserModel.create({email,password,firstName,lastName,username})
const token = createToken(user._id)

function ensureToken(req,res,next) {
    const bearerHeader = req.headers["authorization"]
    if (typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split('')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.status(403)
    }
}

module.exports.checkUser = (req,res,next) =>{
    ensureToken
    if(token){
        jwt.verify(token, JWT_SECRET, async(err,decodedToken)=>{
            if(err){
                res.json({status:false})
                next()
            } else{
                const user = await User.findById(decodedToken.id)
                if(user) res.json({status:true, user: user.email})
                else{
                    res.json({status:false})
                    next()
                }
            }
        })
    }else{
        res.json({status:false})
        next()
    }
}