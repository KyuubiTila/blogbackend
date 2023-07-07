const express = require('express');
const {
  userRegisterController,
  userLoginController,
  userIndividualProfileController,
  allUsersProfileController,
  updateProfileController,
  deleteProfileController,
} = require('../../controllers/User/userController.js');

const userRouter = express.Router();

//REGISTER USER
// POST/api/V1/users/register
userRouter.post('/register', userRegisterController);

// LOGIN USER
// POST/api/V1/users/login
userRouter.post('/login', userLoginController);

// VIEW INDIVIDUAL PROFILE
// GET/api/V1/profile
userRouter.get('/profile/:id', userIndividualProfileController);

// FETCH ALL USERS
// GET/api/V1/allUsers
userRouter.get('/allUsers', allUsersProfileController);

// UPDATE INDIVIDUAL PROFILE
// PUT/api/V1/users/:id
userRouter.put('/:id', updateProfileController);

// DELETE INDIVIDUAL PROFILE
// DELETE/api/V1/users/:id
userRouter.delete('/:id', deleteProfileController);

module.exports = userRouter;
