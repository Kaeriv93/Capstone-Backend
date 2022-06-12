// Dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {PORT = 4000, MONGODB_URL} = process.env
const app = express()
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session")
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
      origin: [process.env.ORIGIN, 'http://localhost:3000'],
      credentials: true,
    })
  );

// Controllers Use
app.use('/user', controllers.blog)
app.use('/', userRoute)
app.use('/', authRoutes)
app.use('/', controllers.post)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authortization');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });

app.set("trust proxy", 1);
app.use(session({
    key: 'session_cookie_user_auth',
    secret: 'mooncore',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 60
    }
}));



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