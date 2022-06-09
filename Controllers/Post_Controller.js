const router = require('express').Router()

const db = require('../models')


router.get('/post', async(req,res)=>{
    try{
        res.json(await db.Post.find({}))
    }catch(error){
        res.status(400).json(error)
    }
})

router.post('/post', async(req,res)=>{
    const newPost = new db.Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(400).json(err)
    }
})

router.put('/post/:id', async(req,res)=>{
    try{
        res.json(await db.Post.findByIdAndUpdate(req.params.id, req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

router.delete('/post/:id', async(req,res)=>{
    try{
        res.json(await db.Post.findByIdAndRemove(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})


module.exports = router