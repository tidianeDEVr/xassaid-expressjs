function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/security/login');
}

module.exports = checkAuthenticated;
