const encryption = require('../util/encryption');
const User = require('../models/User');
const Rent = require("../models/Rent");

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register')
    },
    registerPost: async (req, res) => {
        const userBody = req.body;
        if (!userBody.username || !userBody.password || !userBody.repeatPassword) {
            userBody.error = 'Please fill all fields!';
            res.render('user/register', userBody);
        }

        if (userBody.password !== userBody.repeatPassword) {
            userBody.error = 'Both passwords should match!';
            res.render('user/register', userBody);
            return;
        }
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, userBody.password);
        try {
            const user = await User.create({
                username: userBody.username,
                hashedPass,
                salt,
                firstName: userBody.firstName,
                lastName: userBody.lastName,
                roles: ['User']
            });

            req.login(user, (err) => {
                if (err) {
                    userBody.error = err;
                    res.render('user/register', userBody);
                } else {
                    res.redirect('/');
                }
            })
        } catch (e) {
            console.log(e);
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const userBody = req.body;
        try {
            const user = await User.findOne({username: userBody.username});
            if (!user) {
                userBody.error = 'Username is invalid!';
                res.render('user/login', userBody);
                return;
            }

            if (!user.authenticate(userBody.password)) {
                userBody.error = 'Password is invalid!';
                res.render('user/login', userBody);
                return;
            }

            req.login(user, (err) => {
                if (err) {
                    userBody.error = err;
                    res.render('user/register', userBody);
                } else {
                    res.redirect('/');
                }
            })
        } catch (e) {
            userBody.error = 'Something went wrong!';
            res.render('user/register', userBody);
        }
    },
    myRents: (req, res) => {
        Rent.find({user: req.user._id})
            .populate('car')
            .then((rents) => {

            });
    }
};