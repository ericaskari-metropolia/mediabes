'use strict';
const express = require('express');

async function start() {
    const app = express();
    const port = 3000;
    app.listen(port, () => {
        console.log(`Api Running on port ${port}!`);
    });
}

start().then().catch(console.error);
