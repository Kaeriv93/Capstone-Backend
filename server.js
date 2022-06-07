// Dependencies
require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const {PORT = 4000, MONGODB_URL} = process.env
const app = express()
const controllers = require('./Controllers')
const userRoute = require('./routes/users')
const authRoutes = require('./routes/AuthRoutes')


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
app.use(cookieParser())
app.use(cors())


// Controllers Use
app.use('/user', controllers.blog)
app.use('/', userRoute)
app.use('/', authRoutes)


//Get Home Route Test
app.get('/',(req,res)=>{
    res.send('Hello World')
})



//Listening Port
app.listen(PORT, ()=>console.log(`We listening to port ${PORT}`))