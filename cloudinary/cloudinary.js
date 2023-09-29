const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");

//Config Cloudinary

cloudinary.config({
    cloud_name: 'dizqorvl6',
    api_key: '713383275926155',
    api_secret: 'WdlLJEa5ivMQoJzKV4EN4pq0Q6Q'
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