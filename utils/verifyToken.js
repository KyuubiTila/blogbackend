const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    return err ? false : decoded;
  });
};

module.exports = verifyToken;
