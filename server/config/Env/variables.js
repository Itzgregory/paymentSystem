require('dotenv').config()

module.exports = {
    MONGO_URI: process.env.MONGO_URI,   
    MONGO_URL: process.env.MONGO_URL, 
    PORT: process.env.PORT,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key_cloud: process.env.CLOUDINARY_API_KEY,
    api_secret_cloud: process.env.CLOUDINARY_API_SECRET,
}