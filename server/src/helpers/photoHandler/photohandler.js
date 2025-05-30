const save = require('../../middlewares/cloudinary/cloudinary').save;

const handlePhotoUpload = async (files) => {
    if (!files || !files.avatar) return []; 

    let avatars = Array.isArray(files.avatar) ? files.avatar : [files.avatar];

    const uploadedAvatars = await Promise.all(
        avatars.map(async (file) => {
            const result = await save(file);
            return {
                url: result.secure_url,
                id: result.public_id
            };
        })
    );

    return uploadedAvatars;
};

module.exports = handlePhotoUpload;