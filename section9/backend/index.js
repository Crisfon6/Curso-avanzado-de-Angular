const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./db/config');


const app = express();


//Middlewares:
//cors
app.use(cors());
//Read the body and parseo
app.use(express.json());

//backend_user
//MRdNnv5yHPURY6n7

dbConnection();
//Routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
// app.get('/',(req,res)=>{
//     res.json({message:'Hello World',status:200});
// }); //GET

app.listen(process.env.PORT, (req, res) => {
    console.log('Running on port 3000');
})