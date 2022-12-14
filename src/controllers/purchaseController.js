'use strict';
const depositModel = require('../models/depositModel');
const purchaseModel = require('../models/purchaseModel');
const designModel = require('../models/designModel');
const designFileModel = require('../models/designFileModel');
const uploadModel = require('../models/uploadModel');
const likeModel = require('../models/likeModel');

/** @type {import('express').Handler} */
const getUserPurchases = async (req, res) => {
    const items = await designModel.getAllUserPurchasedDesigns(req.user.id);
    res.status(200).send({ items });
};

module.exports = {
    getUserPurchases: getUserPurchases
};
