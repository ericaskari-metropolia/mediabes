'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { wrapControllerWithErrorHandler } = require('../services/error-handler.service');

router.get('/', wrapControllerWithErrorHandler(purchaseController.getUserPurchases));

module.exports = router;
