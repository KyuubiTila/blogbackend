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

// FOLLOWING
const followingController = async (req, res, next) => {
  try {
    // find the user to follow
    const userToFollow = await User.findById(req.params.id);
    // find user who is following
    const userWhoFollowed = await User.findById(req.userAuth);

    // check if user and user who followed are found
    if (userToFollow && userWhoFollowed) {
      // check if userWhoFollowed is user already in the user followers array
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appError('you already follow this user'));
      } else {
        // push user who followed to the user followers array
        userToFollow.followers.push(userWhoFollowed._id);
        // push user to follow to user following array
        userWhoFollowed.following.push(userToFollow._id);
        // save
        await userWhoFollowed.save();
        await userToFollow.save();

        // send response back to the user
        res.json({
          status: 'success',
          data: 'you have succesfully followed this user',
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

// UNFOLLOW
const unfollowController = async (req, res, next) => {
  try {
    //1 find the user to unfollow
    const userToBeUnfollowed = await User.findById(req.params.id);

    //2 check is user who is unfllowing i.e loggedin
    const userWhoUnfollowed = await User.findById(req.userAuth);

    //3 check if user who is to be unfllowed and user who is logged in are in order
    if (userToBeUnfollowed && userWhoUnfollowed) {
      //4 check if user userWhoUnfollowed is already in the user followers array

      const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userWhoUnfollowed._id.toString()
      );
      if (!isUserAlreadyFollowed) {
        return next(appError('you do not follow this user'));
      } else {
        //5 remove user who was unfollowed from userfollowing array
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnfollowed._id.toString()
        );

        //6 save the user
        await userToBeUnfollowed.save();

        //7 remove userToBeUnfollowed from userWhoUnfollowed following user array
        userWhoUnfollowed.following = userWhoUnfollowed.following.filter(
          (following) =>
            following.toString() !== userToBeUnfollowed._id.toString()
        );
        //8 save the user
        await userWhoUnfollowed.save();
        res.json({
          status: 'success',
          data: 'You have successfully unfollowed this user',
        });
      }
    }
  } catch (error) {
    res.json(`Error: ${error.message}`);
  }
};

// BLOCK USER
const blockUserController = async (req, res, next) => {
  try {
    //1 FIND USER TO BE BLOCKED
    const userToBeBlocked = await User.findById(req.params.id);
    // 2 FIND USER WHO IS BLOCKING THE OTHER PERSON FROM DB
    const userWhoIsBlocking = await User.findById(req.userAuth);

    // check if user to be blocked and user who blocked are found in db
    if (userToBeBlocked && userWhoIsBlocking) {
      // 3. CHECK IF userWhoIsBlocking ALREADY HAS THE userToBeBlocked IN ITS BLOCKED ARRAY
      const isUserAlreadyBlocked = userWhoIsBlocking.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appError('You already blocked this user'));
      }
      // 4 PUSH userToBeBlocked INTO THE ARRAY OF BLOCKED OF THE userWhoIsBlocking
      userWhoIsBlocking.blocked.push(userToBeBlocked._id);
      // 5 SAVE ARRAY OF userWhoIsBlocking
      userWhoIsBlocking.save();
      res.json({
        status: 'success',
        data: 'You have succesfully blocked this user',
      });
    }
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
  followingController,
  unfollowController,
  blockUserController,
};
