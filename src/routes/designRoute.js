'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controllers/designController');
const { wrapControllerWithErrorHandler, validateExpectedFields } = require('../services/error-handler.service');
const uploadService = require('../services/upload.service');

router
    .post(
        '/',
        uploadService.imageUpload.single('singleImage'),
        body('price').isNumeric({ no_symbols: true }).toFloat(),
        body('description').isString(),
        validateExpectedFields('saveDesign'),
        wrapControllerWithErrorHandler(controller.saveDesign)
    )
    .post('/:designId/like', wrapControllerWithErrorHandler(controller.likeDesign))
    .get('/', wrapControllerWithErrorHandler(controller.getAllDesigns));

module.exports = router;
