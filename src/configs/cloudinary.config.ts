// import multer from "multer";
// import { Request } from "express";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const CLOUD_NAME = "dbpldobhx";
// const STORE_NAME = "Task1";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME || CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // Define a file filter function to check allowed formats
// const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
//   const allowedFormats = ["jpg", "png"];

//   if (allowedFormats.includes(file.mimetype.split("/")[1])) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error("Invalid file format"), false); // Reject the file
//   }
// };

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => {
//     return {
//       folder: `${STORE_NAME}/ImageTask1`,
//       public_id: file.originalname,
//     };
//   },
// });

// const uploadCloud = multer({
//   storage,
//   limits: { fieldSize: 10 * 1024 * 1024 },
//   fileFilter, // Use the fileFilter function
// });

// export default uploadCloud;
