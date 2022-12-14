'use strict';
const designModel = require('../models/designModel');
const userModel = require('../models/userModel');
const balanceModel = require('../models/balanceModel');
const userFollowModel = require('../models/userFollowModel');
const userAvatarModel = require('../models/userAvatarModel');
const uploadModel = require('../models/uploadModel');
const { validationResult } = require('express-validator');

/** @type {import('express').Handler} */
const getUsers = async (req, res) => {
    console.log('getUsers');
    console.log(req.user);
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

/** @type {import('express').Handler} */
const getUser = async (req, res) => {
    const user = await userModel.getUserById(req.params.userId);
    if (user) {
        const followerUsers = await userFollowModel.getFollowersByUserId(req.params.userId);
        const followedUsers = await userFollowModel.getFollowedUserByUserId(req.params.userId);
        const userAvatar = await userAvatarModel.getUserAvatar(req.params.userId);
        res.json({ user, followerUsers, followedUsers, userAvatar });
    } else {
        res.status(404).send({ message: 'User not found!' });
    }
};

/** @type {import('express').Handler} */
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

/** @type {import('express').Handler} */
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

/** @type {import('express').Handler} */
const checkToken = async (req, res) => {
    const balance = await balanceModel.getBalance(req.user.id);
    const followerUsers = await userFollowModel.getFollowersByUserId(req.user.id);
    const followedUsers = await userFollowModel.getFollowedUserByUserId(req.user.id);
    const userAvatar = await userAvatarModel.getUserAvatar(req.user.id);
    res.json({ user: req.user, balance, followerUsers, followedUsers, userAvatar });
};

/** @type {import('express').Handler} */
const getUserDesigns = async (req, res) => {
    const items = await designModel.getAllUsersDesigns(req.params.userId);
    res.status(200).send({ items });
};

/** @type {import('express').Handler} */
const updateUserAvatar = async (req, res) => {
    const {
        url,
        blobSize: blob_size,
        blobName: blob_name,
        encoding,
        mimetype: mime_type,
        originalname: original_name
    } = req.file ?? {};

    const { id } = await uploadModel.saveUpload({
        url: `https://mediabes.blob.core.windows.net/mediabes/${blob_name}`,
        blob_size,
        mime_type,
        original_name,
        encoding,
        blob_name
    });

    await userAvatarModel.saveUserAvatar({
        user_id: req.user.id,
        upload_id: id
    });

    res.json({ url });
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    modifyUser,
    deleteUser,
    checkToken,
    getUserDesigns: getUserDesigns,
    updateUserAvatar: updateUserAvatar
};
