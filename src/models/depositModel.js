'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveDeposit = async (userId, amount) => {
    const sql = 'INSERT INTO deposit (user_id, amount) VALUES (?, ?)';
    await promisePool.query(sql, [userId, amount]);
};

module.exports = {
    saveDeposit: saveDeposit
};
