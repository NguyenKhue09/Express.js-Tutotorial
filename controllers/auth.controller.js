const md5 = require('md5');

const db = require('../db');

module.exports.login = (req,res) => {
    res.render('auth/login');  
};

module.exports.postLogin = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = db.get('users').find({ email : email }).value();

    if(!user) {
        res.render('auth/login',{
            errors: [
                'User does not exists'
            ],
            values: res.body
        });
        return;
    }

    const hashedPassword = md5(password);

    if(user.password !== hashedPassword) {
        res.render('auth/login',{
            errors: [
                'Wrong password'
            ],
            values: res.body
        });
    }

    // option signed = true để xài signed cookie
    res.cookie('userId', user.id, {
        signed: true
    });

    res.redirect('/users');
};