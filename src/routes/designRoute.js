'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
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
    .post(
        '/:designId/like',
        param('designId').isNumeric({ no_symbols: true }),
        validateExpectedFields('likeDesign'),
        wrapControllerWithErrorHandler(controller.likeDesign)
    )
    .post(
        '/:designId/buy',
        param('designId').isNumeric({ no_symbols: true }),
        validateExpectedFields('likeDesign'),
        wrapControllerWithErrorHandler(controller.buyDesign)
    )
    .get('/', wrapControllerWithErrorHandler(controller.getAllDesigns))
    .get(
        '/:designId',
        param('designId').isNumeric({ no_symbols: true }),
        validateExpectedFields('getDesignDetails'),
        wrapControllerWithErrorHandler(controller.getDesignDetails)
    )
    .get(
        '/:designId/like',
        param('designId').isNumeric({ no_symbols: true }),
        validateExpectedFields('getDesignLikeCount'),
        wrapControllerWithErrorHandler(controller.getDesignLikeCount)
    );

module.exports = router;
