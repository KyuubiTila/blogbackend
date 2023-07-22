const express = require('express');
const storage = require('../../config/cloudinary.js');
const {
  userRegisterController,
  userLoginController,
  userIndividualProfileController,
  allUsersProfileController,
  // updateProfileController,
  deleteProfileController,
  profilePhotoUploadController,
  whoViewedMyProfileController,
  followingController,
  unfollowController,
  blockUserController,
  unblockUserController,
  adminBlockUserController,
  adminUnBlockUserController,
  detailsUpdateController,
  passwordUpdateController,
} = require('../../controllers/User/userController.js');
const isLoggedIn = require('../../middlewares/isLoggedin.js');
const multer = require('multer');
const isAdmin = require('../../middlewares/isAdmin.js');
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

// WHO VIWED MY PROFILE
// GET/api/V1/profile-viewer/:id
userRouter.get('/profile-viewer/:id', isLoggedIn, whoViewedMyProfileController);

// FETCH ALL USERS
// GET/api/V1/allUsers
userRouter.get('/allUsers', allUsersProfileController);

// UPDATE INDIVIDUAL PROFILE
// PUT/api/V1/users/:id
userRouter.put('/', isLoggedIn, detailsUpdateController);

// UPDATE INDIVIDUAL PASSWORD
// PUT/api/V1/users/:id
userRouter.put('/update-password', isLoggedIn, passwordUpdateController);

// FOLLOWING USERS
// GET/api/V1/users/following/:id
userRouter.get('/following/:id', isLoggedIn, followingController);

// UNFOLLOW USERS
// GET/api/V1/users/following/:id
userRouter.get('/unfollow/:id', isLoggedIn, unfollowController);

// BLOCK USERS
// GET/api/V1/users/block/:id
userRouter.get('/block/:id', isLoggedIn, blockUserController);

// UNBLOCK USERS
// GET/api/V1/users/unblock/:id
userRouter.get('/unblock/:id', isLoggedIn, unblockUserController);

// ADMIN BLOCK USERS
// PUT/api/V1/users/admin-block/:id
userRouter.put(
  '/admin_block/:id',
  isLoggedIn,
  isAdmin,
  adminBlockUserController
);

// ADMIN UNBLOCK USERS
// PUT/api/V1/users/admin-unblock/:id
userRouter.put(
  '/admin_unblock/:id',
  isLoggedIn,
  isAdmin,
  adminUnBlockUserController
);

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
