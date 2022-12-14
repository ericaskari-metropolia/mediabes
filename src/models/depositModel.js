'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveDeposit = async (userId, amount) => {
    const sql = 'INSERT INTO deposit (user_id, amount) VALUES (?, ?)';
    await promisePool.query(sql, [userId, amount]);
};
const getUserSumDeposit = async (userId) => {
    const [[{ amount }]] = await promisePool.query('select SUM(amount) as amount from deposit where user_id = ?', [
        userId
    ]);
    return parseFloat(amount ?? 0);
};

module.exports = {
    saveDeposit: saveDeposit,
    getUserSumDeposit: getUserSumDeposit
};
