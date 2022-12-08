'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const getAllUsersDesigns = async (id, res) => {
    try {
        const sql = 'SELECT designs.picture_src, user.name, likecount, commentcount, designs.description, designs.price FROM designs LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id JOIN user ON designs.user_id = user.id AND user.id = ? GROUP BY designs.id ORDER BY designs.created_at DESC';
        const [rows] = await promisePool.query(sql, [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getRecommendations = async (res) => {
    try {
        const sql = 'SELECT designs.picture_src, user.name, likecount, commentcount, designs.description, designs.price FROM designs LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id JOIN user ON designs.user_id = user.id ORDER BY designs.created_at DESC';
        const [rows] = await promisePool.query(sql);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getFeedPage = async (user_id, res) => {
    try {
        const sql = 'SELECT designs.description, designs.picture_src, user.name AS user_id, user.username, designs.price FROM user_follow LEFT JOIN designs ON designs.user_id = ? OR designs.user_id = user_follow.followed_user_id LEFT JOIN user ON designs.user_id = user.id WHERE (user_follow.user_id = ? OR user_follow.user_id = NULL)';
        const [rows] = await promisePool.query(sql, [user_id]);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getOneDesignCard = async (design_id, res) => {
    try {
        const [rows] = await promisePool.query('SELECT designs.id, designs.picture_src, user.name, likecount, commentcount, designs.description, designs.price FROM designs LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id JOIN user ON designs.user_id = user.id GROUP BY (SELECT id FROM designs WHERE id = ?)', [design_id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const saveDesign = async (user_id, picture_src, price, description, res) => {
    try {
        const [rows] = await promisePool.query('INSERT INTO designs (user_id, picture_src, price, description) VALUES (?, ?, ?, ?)', [user_id,picture_src, price, description]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).json({ error: e.message });
    }
};

const updateDesignDescription = async (description, id, res) => {
    try {
        const [rows] = await promisePool.query('UPDATE designs SET description = ? WHERE designs.id = ?', [description, id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const deleteDesignById = async (designId, res) => {
    try {
        const [rows] = await promisePool.query('DELETE FROM designs WHERE id = ?', [designId]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    getAllUsersDesigns,
    getRecommendations,
    getFeedPage,
    getOneDesignCard,
    saveDesign,
    updateDesignDescription,
    deleteDesignById
};