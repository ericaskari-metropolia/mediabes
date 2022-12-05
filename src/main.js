'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const passport = require('passport');
const passportService = require('./utils/passport');
const { authenticateJWT } = require('./utils/passport');

async function start() {
    dotenv.config();
    const app = express();
    const port = 3000;
    app.use(cors());
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    passportService.initStrategies();
    app.use(passport.initialize());

    app.use('/auth', authRouter);
    app.use('/user', authenticateJWT, userRouter);

    app.listen(port, () => {
        console.log(`Api Running on port ${port}!`);
        //console.log(process.env)
    });
}

start().then().catch(console.error);
