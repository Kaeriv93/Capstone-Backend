const User = require('../models/User')
const router = require('express').Router()


router.get('/users', async(req,res)=>{
    try{
        res.json(await User.find({})).populate('blog')
    }catch(error){
        res.status(400).json(error)
    }
})

router.post('/users', async(req,res)=>{
    try{
        res.json(await User.create(req.body)).populate('blog')
    }catch(error){
        res.status(400).json(error)
    }
})

router.get('/user/:id', async(req,res)=>{
    try{
        res.json(await User.findById(req.params.id)).populate('blog')
    }catch(error){
        res.status(400).json(error)
    }
})

router.put('/user/:id', async(req,res)=>{
    try{
        res.json(await User.findByIdAndUpdate(req.params.id,req.body)).populate('blog')
    }catch(error){
        res.status(400).json(error)
    }
})

router.delete('/user/:id', async(req,res)=>{
    try{
        res.json(await User.findByIdAndRemove(req.params.id)).populate('blog')
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports = router