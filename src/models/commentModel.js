'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveComment = async (user_id, design_id, description, res) => {
    try {
        const sql = 'INSERT INTO comments (user_id, design_id, description) VALUES (?, ?, ?)';
        const [rows] = await promisePool.query(sql, [user_id, design_id, description]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const deleteComment = async (comment_id, res) => {
    try {
        const sql = 'DELETE FROM comments WHERE id = ?';
        const [rows] = await promisePool.query(sql, [comment_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const countCommentsByDesignId = async (design_id, res) => {
    try {
        const sql = 'SELECT COUNT(id) FROM comments WHERE design_id = ?';
        const [rows] = await promisePool.query(sql, [design_id]);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getAllCommentByDesignId = async (design_id, res) => {
    try {
        const [rows] = await promisePool.query('SELECT user.name, comments.description FROM user, comments WHERE comments.design_id = ? AND user_id = user.id ORDER BY created_at DESC', [design_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    saveComment,
    deleteComment,
    countCommentsByDesignId,
    getAllCommentByDesignId
};