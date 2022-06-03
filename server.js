require('dotenv').config()
const express = require('express')
// const {PORT = 4000, MONGODB_URL} = process.env
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.listen(4000, ()=>console.log(`We listening to port 4000`))