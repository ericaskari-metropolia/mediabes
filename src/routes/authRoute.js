'use strict';
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { login, logout, register } = require('../controllers/authController');
const { wrapControllerWithErrorHandler } = require('../services/error-handler.service');

router
    .get('/logout', wrapControllerWithErrorHandler(logout))
    .post('/login', wrapControllerWithErrorHandler(login))
    .post(
        '/register',
        body('name').isLength({ min: 2 }).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('username').trim(),
        body('password').isLength({ min: 8 }).trim().withMessage('Should be at least 8 characters'),
        wrapControllerWithErrorHandler(register)
    );

module.exports = router;
