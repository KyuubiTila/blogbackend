const appError = require('../utils/appError');
const getTokenFromHeader = require('../utils/getTokenFromHeader');
const verifyToken = require('../utils/verifyToken');
const isLoggedIn = (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  // verify the token
  const decodedUser = verifyToken(token);
  //   save the user into the required object
  req.userAuth = decodedUser.id;
  !decodedUser
    ? next(appError('invalid or expired token, please login again', 500))
    : next();
};

module.exports = isLoggedIn;
