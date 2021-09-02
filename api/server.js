const express = require('express');
const csrf = require('csurf');
const app = express();
var cookieParser = require('cookie-parser');
const auth = require('./router/auth');

const csrfProtection = csrf({ cookie: true });

// middleware
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.cookie(`Cookie token name`, `encrypted cookie string Value`);
});

app.use('/api', auth);


app.use(csrfProtection);
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });

  console.log(req.csrfToken())
});

app.listen(5000);