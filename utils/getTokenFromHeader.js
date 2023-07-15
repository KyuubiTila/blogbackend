const getTokenFromHeader = (req) => {
  // get token from header
  const headerObj = req.headers;
  const token = headerObj['authorization'].split(' ')[1];
  return token !== undefined ? token : false;

  //   if (token !== undefined) {
  //     return token;
  //   } else {
  //     return {
  //       status: 'failed',
  //       msg: 'no token found on the headers',
  //     };
  //   }
};
module.exports = getTokenFromHeader;
