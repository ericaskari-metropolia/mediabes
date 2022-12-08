'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveLike = async (user_id, design_id, res) => {
    try {
        const sql = 'INSERT INTO likes (user_id, design_id) VALUES (?, ?)';
        const [rows] = await promisePool.query(sql, [user_id, design_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const deleteLike = async (user_id, design_id, res) => {
    try {
        const sql = 'DELETE FROM likes WHERE user_id = ? AND design_id = ?';
        const [rows] = await promisePool.query(sql, [user_id, design_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const countLikesByDesignId = async (design_id, res) => {
    try {
        const sql = 'SELECT COUNT(user_id) FROM likes WHERE design_id = ?';
        const [rows] = await promisePool.query(sql, [design_id]);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getUsersWhoLikedByDesignId = async (design_id, res) => {
    try {
        const [rows] = await promisePool.query('SELECT user.name FROM user, likes WHERE likes.design_id = ? AND user_id = user.id', [design_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    saveLike,
    deleteLike,
    countLikesByDesignId,
    getUsersWhoLikedByDesignId
};