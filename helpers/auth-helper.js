const isLoggedIn = (req, res, next) => {
  console.log('Middleware', req.session)  
  if (req.session.loggedInUser) {
    next();
  }
  else {
    res.status(401).json({
      message: 'No user logged in',
      code: 401,
    })
  };
};

module.exports = {isLoggedIn}