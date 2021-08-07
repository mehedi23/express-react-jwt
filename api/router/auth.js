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
            email: admin.email
        }, 'sdfd234s234f324dsf324sdfsd234fsdfw23432er')


        res.header("auth-token", acces_token).send(acces_token);


    } else {
        res.status(401).send('You are fake');
    };
})

function verify(req, res, next) {
    
    const token = req.header('auth-token');
    
    if(!token) return res.status(400).send("access denied");

    try {
        const verified = jwt.verify(token , 'sdfd234s234f324dsf324sdfsd234fsdfw23432er');
        req.user = verified;
    } catch (error) {
        res.status(400).send('Invalid Token')
    }

    next()
}


module.exports = router;