'use strict';
const jwtService = require('../services/jwt.service');
const passport = require('passport');
const bcryptService = require('../services/bcrypt.service');
const { validationResult } = require('express-validator');
const { addUser, getUserByEmail } = require('../models/userModel');

const login = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'The username or password you entered is incorrect'
            });
        }

        // generate a signed son web token with the contents of user object and return it in the response
        delete user.password;
        const { expiresAt, accessToken } = jwtService.createUserLoginToken(user.id);
        return res.status(200).json({ user, expiresAt, accessToken });
    })(req, res);
};

const register = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser = req.body;
    if (!newUser.role) {
        // default user role (normal user)
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'User registration failed',
            errors: errors.array()
        });
    }

    // Hash the input password and replace the clear text passwd with the hashed one.
    //before adding to the db
    newUser.password = bcryptService.hash(newUser.password);
    const result = await addUser(newUser, res);
    const user = await getUserByEmail(newUser.email);
    const { expiresAt, accessToken } = jwtService.createUserLoginToken(user.id);
    res.status(201).json({
        message: 'You have been successfully registered and logged in. Redirecting to homepage now.',
        user,
        expiresAt,
        accessToken
    });
};

const logout = (req, res) => {
    console.log('some user logged out');
    res.json({ message: 'logged out' });
};

module.exports = {
    login: login,
    logout,
    register
};
