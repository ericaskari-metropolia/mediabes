'use strict';
const express = require('express');
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute');
const passport = require('./utils/passport');

async function start() {
    const app = express();
    const port = 3000;
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    app.use(passport.initialize());
    app.use('/auth', authRouter);
    app.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
    
    app.listen(port, () => {
        console.log(`Api Running on port ${port}!`);
        //console.log(process.env)
    });
}

start().then().catch(console.error);
