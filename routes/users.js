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

router.put('/user/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });
module.exports = router