const getTokenFromHeader = require('../utils/getTokenFromHeader');

const isLoggedIn = (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.json({
      msg: 'no token available on header',
    });
  } else {
    next();
  }

  // verify the token
  //   save the user into the required object
};

module.exports = isLoggedIn;
