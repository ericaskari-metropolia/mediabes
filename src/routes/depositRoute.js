'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controllers/depositController');
const { wrapControllerWithErrorHandler, validateExpectedFields } = require('../services/error-handler.service');

router.post(
    '/',
    body('amount').isNumeric({ no_symbols: true }),
    body('cardNumber').isNumeric().isLength({ min: 16, max: 16 }).trim(),
    body('cardHolderName').isString().trim(),
    validateExpectedFields('saveDeposit'),
    wrapControllerWithErrorHandler(controller.saveDeposit)
);

module.exports = router;
