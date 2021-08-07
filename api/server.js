const express = require('express');
const app = express();
const auth = require('./router/auth')

// middleware
app.use(express.json());

app.get('/' , ( req , res ) => {
    res.send(' JWT access and refresh token ');
});

app.use('/user' , auth);

app.listen(5000);