'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const getAllUsers = async (res) => {
    const sql = 'SELECT id, username, description, password, email, name FROM user';
    console.log(sql);
    const [rows] = await promisePool.query(sql);
    return rows;
};

const getUserById = async (id) => {
    const sql = 'SELECT id, username, description, password, email, name FROM user WHERE id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
};

const getUserByUsername = async (id) => {
    const sql = 'SELECT name, username FROM user WHERE id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
};

const getUserByEmail = async (email, res) => {
    const sql = 'SELECT id, username, description, password, email, name FROM user WHERE email = ?';
    const [rows] = await promisePool.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
};

const getUserLogin = async (user) => {
    console.log('getUserLogin()', user);
    const [rows] = await promisePool.execute('SELECT * FROM user WHERE username = ?', user);
    return rows;
};

const addUser = async (user, res) => {
    const sql = 'INSERT INTO user (username,  password, email, name, description) VALUES  (?, ?, ?, ?, ?)';
    const values = [user.username, user.password, user.email, user.name, user.description ?? null];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
};

const updateUserById = async (user, res) => {
    console.log('Modify user:', user);
    const sql = 'UPDATE user SET name = ?, email = ?, password = ?, username = ?, description = ? ' + 'WHERE id = ?';
    const values = [user.name, user.email, user.password, user.username, user.description, user.id];
    const [rows] = await promisePool.query(sql, values);
    return rows;
};

const deleteUserById = async (userId, res) => {
    const [rows] = await promisePool.query('DELETE FROM user WHERE id = ?', [userId]);
    return rows;
};

module.exports = {
    getAllUsers,
    getUserById: getUserById,
    getUserByUsername,
    getUserByEmail: getUserByEmail,
    getUserLogin: getUserLogin,
    addUser: addUser,
    updateUserById,
    deleteUserById
};
