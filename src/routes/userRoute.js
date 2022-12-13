'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const userController = require('../controllers/userController');
const { wrapControllerWithErrorHandler, validateExpectedFields } = require('../services/error-handler.service');
const uploadService = require('../services/upload.service');

router
    .get('/', wrapControllerWithErrorHandler(userController.getUsers))
    .get('/token', wrapControllerWithErrorHandler(userController.checkToken))
    .get(
        '/:userId',
        param('userId').isNumeric({ no_symbols: true }),
        validateExpectedFields('getUser'),
        wrapControllerWithErrorHandler(userController.getUser)
    )
    .post(
        '/',
        body('name').isLength({ min: 3 }).trim().escape(),
        body('username').isLength({ min: 5 }).trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }).trim(),
        wrapControllerWithErrorHandler(userController.createUser)
    )
    .put(
        '/',
        body('name').isLength({ min: 3 }).trim().escape(),
        body('username').isLength({ min: 5 }).trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }).trim(),
        wrapControllerWithErrorHandler(userController.modifyUser)
    )
    .put(
        '/:userId',
        body('name').isLength({ min: 3 }).trim().escape(),
        body('username').isLength({ min: 5 }).trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }).trim(),
        wrapControllerWithErrorHandler(userController.modifyUser)
    )
    .post(
        '/:userId/avatar',
        uploadService.avatarImage.single('singleImage'),
        wrapControllerWithErrorHandler(userController.updateUserAvatar)
    )
    .delete('/:userId', wrapControllerWithErrorHandler(userController.deleteUser));

module.exports = router;
