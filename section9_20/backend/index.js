const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');


const app = express();


//Middlewares:
//cors
app.use(cors());

// public folder
app.use(express.static('public'));

//Read the body and parseo
app.use(express.json());

//backend_user
//MRdNnv5yHPURY6n7

dbConnection();
//Routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospital'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/search', require('./routes/searchs'));
app.use('/api/uploads', require('./routes/uploads'));

// The last configuration 
app.get('*',(req,res)=>{
    res.sendFile( path.resolve(__dirname,'public/index.html'));
});

// app.get('/',(req,res)=>{
//     res.json({message:'Hello World',status:200});
// }); //GET

app.listen(process.env.PORT, (req, res) => {
    console.log('Running on port 3000');
})