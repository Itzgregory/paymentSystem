const cloudinary = require('cloudinary').v2;
const { variables: { cloud_name, api_key_cloud, api_secret_cloud } } = require('../../../config');
const fs = require('fs').promises;
const { logger } = require('../../helpers/logger');

cloudinary.config({
    cloud_name:cloud_name,
    api_key: api_key_cloud,
    api_secret: api_secret_cloud
});

const save = async (avatar) => {
    try {
        const result = await cloudinary.uploader.upload(avatar.tempFilePath);
        await fs.unlink(avatar.tempFilePath);
        logger.info('File deleted: ' + avatar.tempFilePath);

        return { url: result.secure_url, id: result.public_id }; 
    } catch (error) {
        logger.error('Cloudinary Upload Error:', error);
        throw new Error('Failed to upload image');
    }
};

const destroy = async (data) => {
    try {
        const deletePromises = data.map(id => id ? cloudinary.uploader.destroy(id) : null);
        await Promise.all(deletePromises);
        logger.info('Images deleted successfully:', data);
    } catch (error) {
        logger.error('Cloudinary Delete Error:', error);
        throw new Error('Failed to delete images');
    }
};

module.exports = { save, destroy };