'use strict';
const designModel = require('../models/designModel');
const designFileModel = require('../models/designFileModel');
const uploadModel = require('../models/uploadModel');

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
        url,
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

const getAllDesigns = async (req, res) => {
    return res.status(200).send({ items: await designModel.getAllDesigns() });
};

module.exports = {
    saveDesign: saveDesign,
    getAllDesigns: getAllDesigns
};
