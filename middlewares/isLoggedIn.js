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
    ? res.json({ msg: 'invalid /expired token, please login again' })
    : next();
};

module.exports = isLoggedIn;
