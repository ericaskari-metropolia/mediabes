'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const savePurchase = async (design_id, user_id) => {
    const sql = 'INSERT INTO purchase (design_id, user_id) VALUES (?, ?)';
    const [rows] = await promisePool.query(sql, [design_id, user_id]);
    return rows;
};

const getUserSumPurchases = async (user_id) => {
    const [[{ amount }]] = await promisePool.query(
        'select SUM(price) as amount from purchase left join designs on purchase.design_id = designs.id where purchase.user_id = ?',
        [user_id]
    );
    return parseFloat(amount ?? 0);
};

module.exports = {
    savePurchase,
    getUserSumPurchases
};
