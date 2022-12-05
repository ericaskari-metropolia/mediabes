'use strict';
const pool = require('../database/database');
const promisePool = pool.promise();

const getAllUsers = async (res) => {
    try {
        const sql = 'SELECT id, username, description, password, email, name FROM user';
        console.log(sql);
        const [rows] = await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getUserById = async (id, res) => {
    try {
        const sql = 'SELECT id, username, description, password, email, name FROM user WHERE id = ?';
        const [rows] = await promisePool.query(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getUserByEmail = async (email, res) => {
    try {
        const sql = 'SELECT id, username, description, password, email, name FROM user WHERE email = ?';
        const [rows] = await promisePool.query(sql, [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getUserLogin = async (user) => {
    try {
        console.log('getUserLogin()', user);
        const [rows] = await promisePool.execute('SELECT * FROM user WHERE username = ?', user);
        return rows;
    } catch (e) {
        console.log('error', e.message);
        res.status(500).send(e.message);
    }
};

const addUser = async (user, res) => {
    try {
        const sql = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)';
        const values = [user.id, user.username, user.description, user.password, user.email, user.name];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const updateUserById = async (user, res) => {
    try {
        console.log('Modify user:', user);
        const sql =
            'UPDATE user SET name = ?, email = ?, password = ?, username = ?, description = ? ' + 'WHERE id = ?';
        const values = [user.name, user.email, user.password, user.username, user.description, user.id];
        const [rows] = await promisePool.query(sql, values);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).json({ error: e.message });
    }
};

const deleteUserById = async (userId, res) => {
    try {
        const [rows] = await promisePool.query('DELETE FROM user WHERE id = ?', [userId]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    getUserLogin,
    addUser: addUser,
    updateUserById,
    deleteUserById
};
