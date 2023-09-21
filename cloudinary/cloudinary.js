const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");

//Config Cloudinary
cloudinary.config({
    cloud_name: 'diey7k1oh',
    api_key: '949436371279646',
    api_secret: 'vG8OuytO64c4Y_JKcTPATmJiiSs'
});
//Storage of Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ThumNail',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        transformation: [{
            width: 500,
            height: 500,
            gravity: "faces",
            crop: "fill"

        }],
    }
});
const upload = multer({
    storage: storage
});

module.exports = upload;