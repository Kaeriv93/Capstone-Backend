const router = require('express').Router()

const db = require('../models')
const { populate } = require('../models/Blog')

router.get('userpage/:id',(req,res)=>{
    db.User
    .findOne({id:req.params.id})
    .populate({
        path:'blog'
    })
    .then(user=>{
        res.json(user.blog)
    })
    .catch(err => res.status(400).json(err))
})




module.exports = router