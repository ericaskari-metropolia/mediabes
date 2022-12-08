'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const savePurchase = async (design_id, user_id, res) => {
    try {
        const sql = 'INSERT INTO purchase (design_id, user_id) VALUES (?, ?)';
        const [rows] = await promisePool.query(sql, [design_id, user_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    savePurchase
};
