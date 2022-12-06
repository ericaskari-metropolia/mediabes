'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { wrapControllerWithErrorHandler } = require('../services/error-handler.service');

router
    .get('/', wrapControllerWithErrorHandler(userController.getUsers))
    .get('/token', wrapControllerWithErrorHandler(userController.checkToken))
    .get('/:userId', wrapControllerWithErrorHandler(userController.getUser))
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
    .delete('/:userId', wrapControllerWithErrorHandler(userController.deleteUser));

module.exports = router;
