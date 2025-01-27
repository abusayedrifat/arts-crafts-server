require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express())

app.get('/',(req,res)=>{
    res.send('arts and crafts server is running')
})
app.listen(port,(req,res)=>{
    console.log('listening form',port);
})