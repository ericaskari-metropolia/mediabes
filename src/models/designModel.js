'use strict';

const path = require('path');
const fs = require('fs');
const pool = require('../database/database');
const promisePool = pool.promise();

const getAllDesignsSql = fs.readFileSync(path.resolve(__dirname, './queries/getAllDesigns.sql')).toString();
const getAllUserDesignsSql = fs.readFileSync(path.resolve(__dirname, './queries/getAllUserDesigns.sql')).toString();
const getRecommendationsSql = fs.readFileSync(path.resolve(__dirname, './queries/getRecommendations.sql')).toString();
const getFeedPageSql = fs.readFileSync(path.resolve(__dirname, './queries/getFeedPage.sql')).toString();
const getDesignDetailsSql = fs.readFileSync(path.resolve(__dirname, './queries/getDesignDetails.sql')).toString();

const getAllDesigns = async () => {
    const [rows] = await promisePool.query(getAllDesignsSql);
    return rows;
};

const getAllUsersDesigns = async (userId) => {
    const [rows] = await promisePool.query(getAllUserDesignsSql, [userId]);
    return rows;
};

const getRecommendations = async () => {
    const [rows] = await promisePool.query(getRecommendationsSql);
    return rows;
};

const getFeedPage = async (user_id) => {
    const [rows] = await promisePool.query(getFeedPageSql, [user_id]);
    return rows;
};

const getDesignDetails = async (design_id) => {
    const [rows] = await promisePool.query(getDesignDetailsSql, [design_id]);
    return rows;
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
    getAllUsersDesigns: getAllUsersDesigns,
    getRecommendations: getRecommendations,
    getFeedPage,
    getDesignDetails: getDesignDetails,
    saveDesign: saveDesign,
    updateDesignDescription,
    deleteDesignById
};
