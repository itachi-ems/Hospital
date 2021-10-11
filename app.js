const express = require("express");
const morgan = require('morgan');

const departmentRouter= require('./routes/departmentRoute')

const app = express();

//Using Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/departments',departmentRouter);


module.exports=app;