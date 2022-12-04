'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');

router.get('/', userController.getUsers)
.get('/token', userController.checkToken)
  .get('/:userId', userController.getUser) 
  .post('/', 
    body('name').isLength({min: 3}).trim().escape(), 
    body('username').isLength({min: 5}).trim(),
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({min: 8}).trim(), 
    userController.createUser)
  .put('/',
    body('name').isLength({min: 3}).trim().escape(), 
    body('username').isLength({min: 5}).trim(),
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({min: 8}).trim(), 
    userController.modifyUser)
  .put('/:userId',
    body('name').isLength({min: 3}).trim().escape(), 
    body('username').isLength({min: 5}).trim(),
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({min: 8}).trim(), 
    userController.modifyUser)
   .delete('/:userId',        
   userController.deleteUser) 

module.exports = router;