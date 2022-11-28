'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

const getUsers = async (req, res) => {
    const users =await userModel.getAllUsers(res);
  res.json(users);
};

const getUser = async (req, res) => {
    const user = await userModel.getUserById(req.params.userId, res)
    if (user) {
        res.json(user);
    }else{
        res.sendStatus(404);
    }
};

const checkToken = (req, res) => {
    res.json({user: req.user});
};

module.exports = {
    getUser,
    getUsers,
    checkToken
}