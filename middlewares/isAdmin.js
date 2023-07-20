const User = require('../model/User/User');
const appError = require('../utils/appError');
const getTokenFromHeader = require('../utils/getTokenFromHeader');
const verifyToken = require('../utils/verifyToken');
const isAdmin = async (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);

  // verify the token
  const decodedUser = verifyToken(token);

  //   save the user into the required object
  req.userAuth = decodedUser.id;

  // find the user in db
  const user = await User.findById(decodedUser.id);

  // chcek if admin
  if (user.isAdmin) {
    return next();
  } else {
    return next(appError('You are not an admin', 403));
  }
};

module.exports = isAdmin;
