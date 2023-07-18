const express = require('express');
const storage = require('../../config/cloudinary.js');
const {
  userRegisterController,
  userLoginController,
  userIndividualProfileController,
  allUsersProfileController,
  updateProfileController,
  deleteProfileController,
  profilePhotoUploadController,
} = require('../../controllers/User/userController.js');
const isLoggedIn = require('../../middlewares/isLoggedin.js');
const multer = require('multer');
const userRouter = express.Router();

// instace of multer
const upload = multer({ storage });
//REGISTER USER
// POST/api/V1/users/register
userRouter.post('/register', userRegisterController);

// LOGIN USER
// POST/api/V1/users/login
userRouter.post('/login', userLoginController);

// VIEW INDIVIDUAL PROFILE
// GET/api/V1/profile/
userRouter.get('/profile/', isLoggedIn, userIndividualProfileController);

// FETCH ALL USERS
// GET/api/V1/allUsers
userRouter.get('/allUsers', allUsersProfileController);

// UPDATE INDIVIDUAL PROFILE
// PUT/api/V1/users/:id
userRouter.put('/:id', updateProfileController);

// UPLOAD PROFILE PHOTO
// POST/api/V1/users/profile-photo-upload
userRouter.post(
  '/profile-photo-upload',
  isLoggedIn,
  upload.single('profile'),
  profilePhotoUploadController
);

// DELETE INDIVIDUAL PROFILE
// DELETE/api/V1/users/:id
userRouter.delete('/:id', deleteProfileController);

module.exports = userRouter;
