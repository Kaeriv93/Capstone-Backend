const router = require('express').Router()

const db = require('../models')

router.get('/:id/blog', async(req,res)=>{
    try{
        res.json(await db.Blog.find({}))
    }catch(error){
        res.status(400).json(error)
    }
})


router.post('/:id', async(req,res)=>{
    try{
        const user = await db.User.findById(req.params.id).populate('blog')
        userBlog = user.blog
        newBlog = await db.Blog.create(req.body)
        await db.User.findByIdAndUpdate(req.params.id, {blog: [...userBlog, newBlog]})
        res.json({message: 'New Blog Posted!'})
    }catch(error){
        console.log(error)
        console.log('Blog was not posted')
        req.error = error
    }
})

router.put('/:id/blog/:id', async(req,res)=>{
    try{
        res.json(await db.Blog.findByIdAndUpdate(req.params.id,req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

router.delete('/:id/blog/:id', async(req,res)=>{
    try{
        res.json(await db.Blog.findByIdAndRemove(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})


module.exports = router