// Dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {PORT = 4000, MONGODB_URL} = process.env
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
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
app.use(
    cors({
      origin: '*',
      credentials: true,
    })
  );

// Controllers Use
app.use('/user', controllers.blog)
app.use('/', userRoute)
app.use('/', authRoutes)
app.use('/', controllers.post)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE", );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'Super Secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: process.env.NODE_ENV === 'none',
            secure: process.env.NODE_ENV === "production", 
            
            
            
        }
    })
    );

//Get Home Route Test
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/register', (req,res)=>{
    res.send('This is the register')
})

app.get('/login', (req,res)=>{
    res.send('This is the login page')
})


//Listening Port
app.listen(PORT, ()=>console.log(`We listening to port ${PORT}`))