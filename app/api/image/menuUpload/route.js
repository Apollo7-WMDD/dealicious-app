// import { v2 as cloudinary } from 'cloudinary';
// import nextConnect from 'next-connect';
// import multer from 'multer';

// const upload = multer({ storage: multer.memoryStorage() });

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET,
// });

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.single('data'));

// apiRoute.post(async (req, res) => {
//   try {
//     const buffer = req.file.buffer;
//     const stringifiedFile = buffer.toString('base64');
//     const uploadedResponse = await cloudinary.uploader.upload(stringifiedFile, {
//       upload_preset: 'restaurant_menu',
//       resource_type: 'image'
//     });
//     res.json({url: uploadedResponse.secure_url});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({error: 'Something went wrong with the image upload.'});
//   }
// });

// export default apiRoute;
