const bcrypt = require('bcryptjs');
const User = require('../../model/User/User');
const appError = require('../../utils/appError');
const generateToken = require('../../utils/generateToken');
// const getTokenFromHeader = require('../../utils/getTokenFromHeader');
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

// WHO VIEWED MY PROFILE
const whoViewedMyProfileController = async (req, res, next) => {
  try {
    // find the original user
    const user = await User.findById(req.params.id);

    // find the user who is viewing the profile
    const userWhoViewed = await User.findById(req.userAuth);

    // check if original user who viwed are found
    if (user && userWhoViewed) {
      // check if userWhoViewed is alreadi the viewer user array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserAlreadyViewed) {
        return next(appError('you already viewed tis profile'));
      } else {
        // push the user who viewed to the users viewers array
        user.viewers.push(userWhoViewed._id);
        // save the user
        await user.save();
        res.json({
          status: 'success',
          data: 'you have successfully viewed this profile',
        });
      }
    }
  } catch (error) {
    next(appError(error.message, 500));
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

// profile photo upload
const profilePhotoUploadController = async (req, res, next) => {
  // console.log(req.file);

  try {
    // find user to be updated
    const userToUpdate = await User.findById(req.userAuth);
    // check is user is found
    if (!userToUpdate) {
      return next(appError('user not found', 403));
    }
    // check if user is blocked
    if (userToUpdate.isBlocked) {
      return next(appError('Action not allowed, your account is blocked', 403));
    }
    // check if user is updating his profle photo
    if (req.file) {
      // update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: 'success',
        data: 'you have successfully updated your profile photo',
      });
    }
  } catch (error) {
    next(appError(error.message, 500));
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
  profilePhotoUploadController,
  deleteProfileController,
  whoViewedMyProfileController,
};
