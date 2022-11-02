const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendmail = require('../config/email');


// LOGIN ROUTE
router.post('/login', [helper.hasAuthFields, helper.isPasswordAndUserMatch], (req, res) => {
    const token = jwt.sign({state: 'true', email: req.body.email, username: req.body.username }, helper.secret, {
        algorithm: 'HS512',
        expiresIn: '4h',
    });
    res.json({token: token, auth: true, email: req.body.email, username: req.body.username});
});

// REGISTER ROUTE
router.post('/register', [
    check('email').isEmail().not().isEmpty().withMessage('Field can\'t be empty')
        .normalizeEmail({all_lowercase: true}),
    check('password').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('email').custom(value => {
        return helper.database.table('users').filter({
            $or:
                [
                    {email: value}
                ]
        }).get().then(user => {
            if(user) {
                return Promise.reject('Email already exists, choose another one.');
            }
        })
    }),
    body('username').custom(value => {
        return helper.database.table('users').filter({
            $or:
                [
                    {username: value}
                ]
        }).get().then(user => {
            if(user) {
                return Promise.reject('Username already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(201).json({message: errors.array().find(value => value.msg).msg});
    } else {
        let email = req.body.email;
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);
        let fname = req.body.fname;
        let lname = req.body.lname;
        let age = req.body.age;

        /**
         * ROLE 777 = ADMIN
         * ROLE 555 = CUSTOMER
         **/

        helper.database.table('users').insert({
            username: username,
            password: password,
            email: email,
            role: 'user',
            fname: fname || null,
            lname: lname || null,
            age: age
        }).then(lastId => {
            if (lastId.insertId > 0) {
                sendmail.Email(email);
                res.status(201).json({message: 'Registration successful.'});
            } else {
                res.status(501).json({message: 'Registration failed.'});
            }
        }).catch(err => res.status(433).json({error: err.msg}));
    }
});


module.exports = router;
