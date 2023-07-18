const bcrypt = require('bcryptjs');
const User = require('../../model/User/User');
const appError = require('../../utils/appError');
const generateToken = require('../../utils/generateToken');
const getTokenFromHeader = require('../../utils/getTokenFromHeader');
//REGISTER USER
const userRegisterController = async (req, res, next) => {
  const { firstName, lastName, profilePicture, email, password } = req.body;
  try {
    // if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appError('user already exist', 500));
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
    next(appError(error.message));
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
        msg: 'invalid login credentials',
      });
    }

    // verify password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      checkEmail.password
    );

    if (!isPasswordMatched) {
      return res.json({
        msg: 'invalid login credentials',
      });
    }

    // if (!checkEmail) {
    //   return res.json({
    //     msg: 'credentials not found',
    //   });
    // }
    // check validity of password
    // const checkPassword = await User.findOne({ password });
    // if (!checkPassword) {
    //   return res.json({
    //     msg: 'credentials not found',
    //   });
    // }
    res.json({
      status: 'success',
      data: {
        firstName: checkEmail.firstName,
        lastName: checkEmail.lastName,
        email: checkEmail.email,
        isAdmin: checkEmail.isAdmin,
        token: generateToken(checkEmail._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

// VIEW INDIVIDUAL PROFILE
const userIndividualProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: 'success',
      data: user,
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
