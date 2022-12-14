'use strict';
const model = require('../models/depositModel');
const { validationResult } = require('express-validator');

/** @type {import('express').Handler} */
const saveDeposit = async (req, res) => {
    const { id: userId } = req.user;
    const { amount, cardNumber, cardHolderName } = req.body;

    // We imagine payment was successful :)
    await model.saveDeposit(userId, amount);

    res.status(200).send({ message: 'Balance successfully added to the account.' });
};

module.exports = {
    saveDeposit: saveDeposit
};
