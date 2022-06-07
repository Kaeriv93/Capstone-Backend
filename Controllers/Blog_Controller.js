const router = require('express').Router()

const db = require('../models')

// router.get('/:id', (req,res)=>{
//     db.User
//     .findOne({_id:req.params.id})
//     .populate({
//         path:'blog'
//     })
//     .then(user=>{
//         res.json(user.blog)
//     })
//     .catch(err => res.status(400).json(err))
// })

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



module.exports = router