'use strict';

const pool = require('../database/database');
const promisePool = pool.promise();

const saveDesignFile = async ({ upload_id, design_id }) => {
    const [result] = await promisePool.query('INSERT INTO design_file (upload_id, design_id) VALUES (?, ?)', [
        upload_id,
        design_id
    ]);
    const [[query]] = await promisePool.query('SELECT * FROM design_file WHERE id = ?', [result.insertId]);

    return query;
};

const getDesignFile = async (design_id) => {
    const [[query]] = await promisePool.query(
        'select * from design_file left join upload u on u.id = design_file.upload_id where design_id = ? order by created_at desc limit 1',
        [design_id]
    );
    return query;
};

module.exports = {
    saveDesignFile: saveDesignFile,
    getDesignFile: getDesignFile
};
