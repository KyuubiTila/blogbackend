const cloudinary = require('cloudinary').v2;
require('dotenv').config;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configure cloudinary
cloudinary.config({
  cloud_name: 'dbqs4ounc',
  api_key: '787159532288381',
  api_secret: 'Rd_3wfvrYtE64FZm6ChS5MPBTIc',
});

// instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpeg', 'png'],
  params: {
    folder: 'blogbackend',
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

module.exports = storage;
