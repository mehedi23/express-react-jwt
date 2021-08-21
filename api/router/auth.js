const router = require('express').Router();
const jwt = require('jsonwebtoken')

let admin = {
    usename: 'mehedi23',
    name: 'Mehedi Hassan Satu',
    password: 'abcd',
    email: 'mehedi@email.com',
};

let secret_token = 'sdfd234s234f324dsf324sdfsd234fsdfw23432er';
let secret_token_2 = 'sdfd234s234f324dsf324sdfsd234fsdfw23432er';

let refresh_token_copy = []

router.get('/dashboard', verify, (req, res) => {
    res.send({
        title: 'You r log in',
        img: 'https://thumbs.gfycat.com/UnripeThoroughHalibut-max-1mb.gif'
    });
});

router.post('/login', login = (req, res) => {
    let username = req.body.username;
    let passwords = req.body.password;


    if (passwords == admin.password && username == admin.usename) {

        let the_user = {
            username: admin.usename,
            email: admin.email
        };

        const acces_token = access_token_genaret(the_user)
        const refresh_token = jwt.sign(the_user, secret_token, {
            expiresIn: '600s'
        });

        refresh_token_copy.push(refresh_token)

        let token_obj = {
            "auth-token": acces_token,
            "refresh-token": refresh_token,
        };

        res.cookie(`token`, acces_token , {
            httpOnly: true,
        });
        res.header(token_obj).send("send token");

    } else {
        res.status(401).send('You are fake');
    };

});

router.post('/token', (req, res) => {
    const ref_token = req.body.refToken;
    if (!ref_token) res.status(400).send("no ref token");
    if (!ref_token.includes(refresh_token_copy)) res.status(403).send("no more user");

    const some = jwt.verify(ref_token, secret_token)

    let the_user = {
        username: some.usename,
        email: some.email
    };
    const newToken = access_token_genaret(the_user)
    res.send(newToken)
})

function access_token_genaret(the_user) {
    return jwt.sign(the_user, secret_token, {
        expiresIn: '20s'
    })
}

function verify(req, res, next) {
    const token = req.header('auth-token');
    const token_cookie = req.cookies.token;

    console.log(token_cookie)

    if (!token) return res.status(400).send("access denied");

    try {
        const verified = jwt.verify(token, secret_token);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }

};


module.exports = router;