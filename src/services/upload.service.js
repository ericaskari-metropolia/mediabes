'use strict';

const path = require('path');
const multer = require('multer');
const { randomUUID } = require('crypto');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = `${Date.now()}-${randomUUID()}${path.extname(file.originalname)}`;
        resolve(blobName);
    });
};

const resolveMetadata = (req, file) => {
    return new Promise((resolve, reject) => {
        const metadata = { ...file };
        resolve(metadata);
    });
};

const resolveContentSettings = (req, file) => {
    return new Promise((resolve, reject) => {
        resolve({});
    });
};

const azureStorage = new MulterAzureStorage({
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: 'mediabes',
    blobName: resolveBlobName,
    metadata: resolveMetadata,
    contentSettings: resolveContentSettings,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});

const multerBuilder = (fileSize) => {
    return multer({
        storage: azureStorage,
        limits: {
            fileSize
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg)$/)) {
                // upload only png and jpg format
                return cb(new Error('Please upload an Image'));
            }
            cb(undefined, true);
        }
    });
};

const avatarImage = multerBuilder(1024 * 1024 * 5); //    5  MB for Avatar
const imageUpload = multerBuilder(1024 * 1024 * 50); //   50 MB for Designs

//  CRUD
module.exports = {
    avatarImage: avatarImage,
    imageUpload: imageUpload
};
