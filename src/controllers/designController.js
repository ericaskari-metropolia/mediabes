'use strict';
const designModel = require('../models/designModel');
const designFileModel = require('../models/designFileModel');
const uploadModel = require('../models/uploadModel');
const likeModel = require('../models/likeModel');

/** @type {import('express').Handler} */
const saveDesign = async (req, res) => {
    const { price, description } = req.body;
    const { id: userId } = req.user;
    const {
        url,
        blobSize: blob_size,
        blobName: blob_name,
        encoding,
        mimetype: mime_type,
        originalname: original_name
    } = req.file ?? {};

    const savedDesign = await designModel.saveDesign({
        price,
        description,
        user_id: userId
    });

    const savedUpload = await uploadModel.saveUpload({
        url: `https://mediabes.blob.core.windows.net/mediabes/${blob_name}`,
        blob_size,
        mime_type,
        original_name,
        encoding,
        blob_name
    });

    const savedDesignFile = await designFileModel.saveDesignFile({
        design_id: savedDesign.id,
        upload_id: savedUpload.id
    });

    res.status(200).send({ savedDesign, savedUpload, savedDesignFile });
};

/** @type {import('express').Handler} */
const getAllDesigns = async (req, res) => {
    return res.status(200).send({ items: await designModel.getAllDesigns() });
};

/** @type {import('express').Handler} */
const getDesignDetails = async (req, res) => {
    const { designId } = req.params;

    return res.status(200).send({ item: await designModel.getDesignDetails(designId) });
};

/** @type {import('express').Handler} */
const getDesignLikeCount = async (req, res) => {
    const { designId } = req.params;
    const { id: userId } = req.user;

    const isLiked = await likeModel.getLike({ userId, designId });

    return res.status(200).send({ likeCount: await likeModel.countLikesByDesignId(designId), isLiked: !!isLiked });
};

/** @type {import('express').Handler} */
const likeDesign = async (req, res) => {
    const { designId } = req.params;
    const { id: userId } = req.user;

    const currentLike = await likeModel.getLike({ userId, designId });
    console.log({ currentLike });
    if (currentLike) {
        await likeModel.deleteLike({ userId, designId });
    } else {
        await likeModel.saveLike({ userId, designId });
    }
    const likeCount = await likeModel.countLikesByDesignId(designId);

    return res.status(200).send({ isLiked: !currentLike, likeCount });
};

module.exports = {
    saveDesign: saveDesign,
    getAllDesigns: getAllDesigns,
    getDesignLikeCount: getDesignLikeCount,
    getDesignDetails: getDesignDetails,
    likeDesign: likeDesign
};
