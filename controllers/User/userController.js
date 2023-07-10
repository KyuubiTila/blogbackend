const bcrypt = require('bcryptjs');
const User = require('../../model/User/User');
//REGISTER USER
const userRegisterController = async (req, res) => {
  const {
    firstName,
    lastName,
    profilePicture,
    email,
    password,
    // postCount,
    // isBlocked,
    // isAdmin,
    // roles,
    // viewdBy,
    // followers,
    // following,
    // posts,
    // active,
  } = req.body;
  try {
    // if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        msg: 'user already exist',
      });
    }
    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// LOGIN USER
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email exists
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.json({
        msg: 'credentials not found',
      });
    }
    // check validity of password
    const checkPassword = await User.findOne({ password });
    if (!checkPassword) {
      return res.json({
        msg: 'credentials not found',
      });
    }
    res.json({
      status: 'success',
      data: 'user logged in',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// VIEW INDIVIDUAL PROFILE
const userIndividualProfileController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'profile route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// FETCH ALL USERS
const allUsersProfileController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'all users route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// UPDATE INDIVIDUAL PROFILE
const updateProfileController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update user route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// DELETE INDIVIDUAL PROFILE
const deleteProfileController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete user route',
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  userRegisterController,
  userLoginController,
  userIndividualProfileController,
  allUsersProfileController,
  updateProfileController,
  deleteProfileController,
};
