// Dependencies
require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const {PORT = 4000, MONGODB_URL} = process.env
const app = express()


//Middleware
const cors = require('cors')
const morgan = require('morgan')

//Mongo Connections
mongoose.connect(MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Mongoose DB connection successful! We are connected woot woot! 🔌 ⚡️ 🔌 ⚡️ 🔌 ⚡️ ')
}).catch(err=>{
    console.log(err.message)
})

//Using Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//DB
const db = require('./models')

//Users
app.get('/users', async(req,res)=>{
    try{
        res.json(await db.User.find({}))
    }catch(error){
        res.status(400).json(error)
    }
})

app.post('/users', async(req,res)=>{
    try{
        res.json(await db.User.create(req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

app.get('/userpage/:id', async(req,res)=>{
    try{
        res.json(await db.User.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

app.put('/userpage/:id', async(req,res)=>{
    try{
        res.json(await db.User.findByIdAndUpdate(req.params.id,req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

//Get Home Route Test
app.get('/',(req,res)=>{
    res.send('Hello World')
})

//Listening Port
app.listen(PORT, ()=>console.log(`We listening to port ${PORT}`))