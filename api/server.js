const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const auth = require('./router/auth')

// middleware
app.use(express.json());
app.use(cookieParser())

app.get('/' , ( req , res ) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
});

app.use('/user' , auth);

app.listen(5000);