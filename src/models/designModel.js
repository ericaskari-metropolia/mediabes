'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const getAllDesigns = async () => {
    const [rows] = await promisePool.query(
        'SELECT user.username, user.name as name, upload.url as url, user_avatar_upload.url as avatarUrl, design.description, design.price FROM designs as design LEFT JOIN design_file design_file on design.id = design_file.design_id LEFT JOIN upload upload on upload.id = design_file.upload_id LEFT JOIN user user on design.user_id = user.id LEFT JOIN user_avatar user_avatar on user.id = user_avatar.user_id LEFT JOIN upload user_avatar_upload on user_avatar.upload_id = user_avatar_upload.id order by design.created_at desc'
    );
    return rows;
};
const getAllUsersDesigns = async (id, res) => {
    try {
        const sql =
            'SELECT user.name, likecount, commentcount, designs.description, designs.price FROM designs LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id JOIN user ON designs.user_id = user.id AND user.id = ? GROUP BY designs.id ORDER BY designs.created_at DESC';
        const [rows] = await promisePool.query(sql, [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getRecommendations = async (res) => {
    try {
        const sql =
            'SELECT user.name, likecount, commentcount, designs.description, designs.price FROM designs LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id JOIN user ON designs.user_id = user.id ORDER BY designs.created_at DESC';
        const [rows] = await promisePool.query(sql);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getFeedPage = async (user_id, res) => {
    try {
        const sql =
            'SELECT designs.description, user.name AS user_id, user.username, designs.price FROM user_follow LEFT JOIN designs ON designs.user_id = ? OR designs.user_id = user_follow.followed_user_id LEFT JOIN user ON designs.user_id = user.id WHERE (user_follow.user_id = ? OR user_follow.user_id = NULL)';
        const [rows] = await promisePool.query(sql, [user_id]);
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const getOneDesignCard = async (design_id, res) => {
    try {
        const [rows] = await promisePool.query(
            'SELECT designs.id, user.name, likecount, commentcount, designs.description, designs.price FROM designs LEFT JOIN (SELECT design_id, COUNT(*) AS likecount FROM likes GROUP BY design_id) AS liketable ON designs.id = liketable.design_id LEFT JOIN (SELECT design_id, COUNT(*) AS commentcount FROM comments GROUP BY design_id) AS commenttable ON designs.id = commenttable.design_id JOIN user ON designs.user_id = user.id GROUP BY (SELECT id FROM designs WHERE id = ?)',
            [design_id]
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
    }
};

const saveDesign = async ({ user_id, price, description }) => {
    const [result] = await promisePool.query('INSERT INTO designs (user_id, price, description) VALUES (?, ?, ?)', [
        user_id,
        price,
        description
    ]);
    const [[query]] = await promisePool.query('SELECT * FROM designs WHERE id = ?', [result.insertId]);

    return query;
};

const updateDesignDescription = async (description, id, res) => {
    try {
        const [rows] = await promisePool.query('UPDATE designs SET description = ? WHERE designs.id = ?', [
            description,
            id
        ]);
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
    getAllDesigns: getAllDesigns,
    getAllUsersDesigns,
    getRecommendations,
    getFeedPage,
    getOneDesignCard,
    saveDesign: saveDesign,
    updateDesignDescription,
    deleteDesignById
};
