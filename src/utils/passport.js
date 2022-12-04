"use strict";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {getUserLogin} = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config;

passport.use(
  new LocalStrategy(
      {
          usernameField: 'username',
          passwordField: 'password',
          session: false,
          passReqToCallback: true
      },
      
      async (request, username, password, done) => {
        const params = [username];
        const [user] = await getUserLogin(params);

          if (!user) {
              done(null, false);
          }

          if (user.password === password) {
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
        secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
        return done(null, jwtPayload);
    }
));

module.exports = passport;