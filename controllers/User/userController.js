//REGISTER USER
const userRegisterController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'user registered',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// LOGIN USER
const userLoginController = async (req, res) => {
  try {
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
