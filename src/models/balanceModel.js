'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const getBalance = async (userId) => {
    const [[{ 'SUM(amount)': sumDeposit }]] = await promisePool.query(
        `select SUM(amount) from deposit where user_id = ?`,
        [userId]
    );
    const [[{ 'SUM(price)': sumPurchases }]] = await promisePool.query(
        `select SUM(price) from purchase
             left join  designs designs on purchase.design_id = designs.id
             where purchase.user_id = ?`,
        [userId]
    );
    return parseFloat(sumDeposit ?? 0) - parseFloat(sumPurchases ?? 0) ?? 0;
};

module.exports = {
    getBalance
};
