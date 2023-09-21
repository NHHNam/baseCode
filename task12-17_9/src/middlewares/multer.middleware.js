import multer from 'multer';
// Cấu hình multer để lưu tệp tải lên vào thư mục "uploads"
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

export default upload;
