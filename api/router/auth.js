const router = require('express').Router();
const jwt = require('jsonwebtoken')

let admin = {
    usename: 'mehedi23',
    name: 'Mehedi Hassan Satu',
    password: 'abcd',
    email: 'mehedi@email.com',
};

router.get('/dashboard', verify, (req, res) => {
    res.send('this is dashboard');
});

router.post('/login', login = (req, res) => {
    let username = req.body.username;
    let passwords = req.body.password;


    if (passwords == admin.password && username == admin.usename) {
        const acces_token = jwt.sign({
            username: admin.usename,
            email : admin.email
        } , 'sdfd234s234f324dsf324sdfsd234fsdfw23432er')

        
        res.setHeader("Access-Token", acces_token);
        res.send(acces_token);


    } else {
        res.status(401).send('You are fake');
    };
})

function verify(req, res, next) {
    if (2 + 2 == 5) {
        next()
    } else {
        res.status(401).send('no assess')
    }
}


module.exports = router;