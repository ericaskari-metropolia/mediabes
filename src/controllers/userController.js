'use strict';
const userModel = require('../models/userModel');
const balanceModel = require('../models/balanceModel');
const userFollowModel = require('../models/userFollowModel');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    console.log('getUsers');
    console.log(req.user);
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await userModel.getUserById(req.params.userId);
    if (user) {
        const followerUsers = await userFollowModel.getFollowersByUserId(req.params.userId);
        const followedUsers = await userFollowModel.getFollowedUserByUserId(req.params.userId);
        res.json({ user, followerUsers, followedUsers });
    } else {
        res.sendStatus(404);
    }
};

const createUser = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser = req.body;
    if (!newUser.role) {
        //default user role (normal user)
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        const userId = await userModel.addUser(newUser, res);
        res.status(201).json({ message: 'user created', userId: userId });
    } else {
        res.status(400).json({
            message: 'user creation failed',
            errors: errors.array()
        });
    }
};

const modifyUser = async (req, res) => {
    const user = req.body;
    if (req.params.userId) {
        user.id = req.params.userId;
    }
    //  TODO: Hash password
    const result = await userModel.updateUserById(user, res);
    if (result.affectedRows > 0) {
        res.json({ message: 'user modified' + user.id });
    } else {
        res.status(404).json({ message: 'user was already modified' });
    }
};

const deleteUser = async (req, res) => {
    const result = await userModel.deleteUserById(req.params.userId, res);
    console.log('user deleted', result);
    if (result.affectedRows > 0) {
        res.json({ message: 'user deleted' });
    } else {
        res.status(404).json({ message: 'user was already deleted' });
    }
};

const checkToken = async (req, res) => {
    const balance = await balanceModel.getBalance(req.user.id);
    const followerUsers = await userFollowModel.getFollowersByUserId(req.user.id);
    const followedUsers = await userFollowModel.getFollowedUserByUserId(req.user.id);
    res.json({ user: req.user, balance, followerUsers, followedUsers });
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    modifyUser,
    deleteUser,
    checkToken
};
