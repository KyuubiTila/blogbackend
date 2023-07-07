const express = require('express');

const userRouter = express.Router();

//REGISTER USER
// POST/api/V1/users/register
userRouter.post('/register', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'user registered',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// LOGIN USER
// POST/api/V1/users/login
userRouter.post('/login', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'user logged in',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// VIEW INDIVIDUAL PROFILE
// GET/api/V1/profile
userRouter.get('/profile/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'profile route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// FETCH ALL USERS
// GET/api/V1/allUsers
userRouter.get('/allUsers', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'all users route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// UPDATE INDIVIDUAL PROFILE
// PUT/api/V1/users/:id
userRouter.put('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update user route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE INDIVIDUAL PROFILE
// DELETE/api/V1/users/:id
userRouter.delete('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete user route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = userRouter;
