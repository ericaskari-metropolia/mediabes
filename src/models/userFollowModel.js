'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveFollow = async (user_id, followed_user_id, res) => {
    try {
        const sql = 'INSERT INTO user_follow (user_id, followed_user_id) VALUES (?, ?)';
        const [rows] = await promisePool.query(sql, [user_id, followed_user_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const deleteFollow = async (user_id, followed_user_id, res) => {
    try {
        const sql = 'DELETE FROM user_follow WHERE user_id = ? AND followed_user_id = ?';
        const [rows] = await promisePool.query(sql, [user_id, followed_user_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const countFollowersByUserId = async (user_id, res) => {
    try {
        const sql = 'SELECT COUNT(user_id) FROM user_follow WHERE followed_user_id = = ?';
        const [rows] = await promisePool.query(sql, [user_id]);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const countFollowedUsersByUserId = async (user_id, res) => {
    try {
        const [rows] = await promisePool.query('SELECT COUNT(user_id) FROM user_follow WHERE user_id = ?', [user_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getFollowersByUserId = async (user_id) => {
    const [rows] = await promisePool.query(
        'SELECT user.name FROM user, user_follow WHERE followed_user_id = ? AND user.id = user_follow.user_id',
        [user_id]
    );
    return rows;
};

const getFollowedUserByUserId = async (user_id) => {
    const sql = 'SELECT user.name FROM user, user_follow WHERE user_id = ? AND user.id = user_follow.followed_user_id';
    const [rows] = await promisePool.query(sql, [user_id]);
    return rows;
};

module.exports = {
    saveFollow,
    deleteFollow,
    countFollowersByUserId: countFollowersByUserId,
    countFollowedUsersByUserId,
    getFollowersByUserId,
    getFollowedUserByUserId: getFollowedUserByUserId
};
