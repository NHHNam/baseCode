import multer from 'multer';
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({}),
    limits:{
        fileSize: 1024 * 1024 * 15
    },
    fileFilter: (req,file, cb) => {
        let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".tiff" && ext !== ".PNG"&& ext !== ".png") {
        req.body.errored = "File is not support"
    }
    cb(null, true);
  },
})
export default upload