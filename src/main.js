'use strict';
const express = require('express');
const authRouter = require('./routes/authRoute');
const passport = require('./utils/passport');

async function start() {
    const app = express();
    const port = 3000;
    app.use(passport.initialize());
    app.use('/auth', authRouter);
    app.listen(port, () => {
        console.log(`Api Running on port ${port}!`);
    });
}

start().then().catch(console.error);
