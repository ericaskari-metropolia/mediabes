'use strict';
// userRoute
const express = require('express');
const router = express.Router();
// const {body} = require('express-validator');
const userController = require('../controllers/userController');

router.get('/', userController.getUsers)
.get('/token', userController.checkToken)
  .get('/:userId', userController.getUser) 

module.exports = router;