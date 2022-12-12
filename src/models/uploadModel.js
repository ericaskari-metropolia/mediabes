'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveUpload = async ({ url, blob_name, blob_size, encoding, mime_type, original_name }) => {
    const [result] = await promisePool.query(
        'INSERT INTO upload (url, blob_name, blob_size, encoding, mime_type, original_name) VALUES (?, ?, ?, ?, ?, ?)',
        [url, blob_name, blob_size, encoding, mime_type, original_name]
    );
    const [[query]] = await promisePool.query('SELECT * FROM upload WHERE id = ?', [result.insertId]);
    return query;
};

module.exports = {
    saveUpload: saveUpload
};
