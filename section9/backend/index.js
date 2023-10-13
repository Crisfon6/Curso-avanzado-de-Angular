const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./db/config');


const app = express();


//Middlewares:
//cors
app.use(cors());


//backend_user
//MRdNnv5yHPURY6n7

dbConnection();
//Routes:
app.get('/',(req,res)=>{
    res.json({message:'Hello World',status:200});
}); //GET

app.listen(process.env.PORT,(req,res)=>{
    console.log('Running on port 3000');
})