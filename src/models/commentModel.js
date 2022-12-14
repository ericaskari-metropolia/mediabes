'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const getComment = async ({ userId, designId, description }) => {
    const [[query]] = await promisePool.query('SELECT user.name, comments.description FROM comments, user WHERE user_id = ? AND comments.user_id = user.id AND design_id = ? ', [
        userId,
        designId,
        description
    ]);
    return query ?? null;
};

const saveComment = async ({ userId, designId, description }) => {
    const [result] = await promisePool.query('INSERT INTO comments (user_id, design_id, description) VALUES (?, ?, ?)', [userId, designId, description]);

    const [[query]] = await promisePool.query('SELECT user.name, comments.description, comments.created_at FROM user, comments WHERE comments.id = ? AND user.id = comments.user_id', [result.insertId]);

    return query;
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
        const [rows] = await promisePool.query('SELECT user.name, comments.description, comments.created_at FROM user, comments WHERE comments.design_id = ? AND user_id = user.id ORDER BY created_at ASC', [design_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    getAllCommentByDesignId: getAllCommentByDesignId,
    saveComment: saveComment,
    deleteComment: deleteComment,
    countCommentsByDesignId: countCommentsByDesignId,
};