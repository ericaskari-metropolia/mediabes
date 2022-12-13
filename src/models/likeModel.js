'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const getLike = async ({ userId, designId }) => {
    const [[query]] = await promisePool.query('SELECT * FROM likes WHERE user_id = ? AND design_id = ? LIMIT 1', [
        userId,
        designId
    ]);
    return query ?? null;
};

const saveLike = async ({ userId, designId }) => {
    {
        const query = await getLike({ userId, designId });
        if (query) {
            return query;
        }
    }
    {
        await promisePool.query('INSERT INTO likes (user_id, design_id)  VALUES (?, ?)', [userId, designId]);

        const [[query]] = await promisePool.query('SELECT * FROM likes WHERE user_id = ? AND design_id = ? LIMIT 1', [
            userId,
            designId
        ]);

        return query;
    }
};

const deleteLike = async ({ userId, designId }) => {
    {
        const query = await getLike({ userId, designId });
        if (!query) {
            return query;
        }
    }
    await promisePool.query('DELETE FROM likes WHERE user_id = ? AND design_id = ?', [userId, designId]);
};

const countLikesByDesignId = async (designId) => {
    const sql = 'SELECT COUNT(user_id) as count FROM likes WHERE design_id = ?';
    const [[{ count }]] = await promisePool.query(sql, [designId]);
    return count;
};

const getUsersWhoLikedByDesignId = async (designId) => {
    const [rows] = await promisePool.query(
        'SELECT user.name FROM user, likes WHERE likes.design_id = ? AND user_id = user.id',
        [designId]
    );
    return rows;
};

module.exports = {
    getLike: getLike,
    saveLike: saveLike,
    deleteLike: deleteLike,
    countLikesByDesignId: countLikesByDesignId,
    getUsersWhoLikedByDesignId: getUsersWhoLikedByDesignId
};
