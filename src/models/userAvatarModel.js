'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveUserAvatar = async ({ user_id, upload_id }) => {
    const [result] = await promisePool.query('INSERT INTO user_avatar (user_id, upload_id) VALUES (?, ?)', [
        user_id,
        upload_id
    ]);
    const [[query]] = await promisePool.query('SELECT * FROM user_avatar WHERE id = ?', [result.insertId]);

    return query;
};

const getUserAvatar = async (user_id) => {
    const [[query]] = await promisePool.query(
        'select * from user_avatar left join upload u on u.id = user_avatar.upload_id where user_id = ? order by created_at desc limit 1',
        [user_id]
    );
    return query;
};

module.exports = {
    saveUserAvatar: saveUserAvatar,
    getUserAvatar: getUserAvatar
};
