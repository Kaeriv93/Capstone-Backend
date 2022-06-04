const router = require('express').Router()

const db = require('../models')
// const { populate } = require('../models/Blog')

router.get('/:id', (req,res)=>{
    db.User
    .findOne({_id:req.params.id})
    .populate('blogs')
    .then(user=>{
        res.json(user)
    })
    .catch(err => res.status(400).json(err))
})

router.post('/:id/new', async(req,res)=>{
    try{
        res.json(await db.Blog.create(req.body))
        console.log('Blog successfully created!')
    }catch(error){
        console.log(error)
        console.log('Blog was not posted')
        req.error = error
    }
})



module.exports = router