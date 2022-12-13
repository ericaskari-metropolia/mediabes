'use strict';
const passport = require('passport');
const bcryptService = require('../services/bcrypt.service');
const jwtService = require('../services/jwt.service');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { getUserByEmail, getUserById } = require('../models/userModel');

const initStrategies = () => {
    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                session: false,
                passReqToCallback: true
            },

            async (request, username, password, done) => {
                const user = await getUserByEmail(username);

                if (!user) {
                    return done(null, false);
                }

                if (bcryptService.compare(password, user.password)) {
                    return done(null, user);
                }

                done(null, false);
            }
        )
    );

    // JWT strategy for handling bearer token
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET
            },
            async (jwtPayload, done) => {
                const { sub, type } = jwtPayload ?? {};

                if (type !== jwtService.AppJwtTokens.USER_LOGIN_TOKEN) {
                    return done(null, false);
                }

                const user = await getUserById(sub);

                return done(null, user ?? false);
            }
        )
    );
};

/** @type {import('express').Handler} */
const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = {
    authenticateJWT: authenticateJWT,
    initStrategies: initStrategies
};
