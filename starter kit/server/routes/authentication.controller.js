import passport from 'passport';

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/');
}

exports.register = (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.json({
      message: "잘못된 요청입니다"
    });
  }

  passport.authenticate('local-register', (err, user, info) => {
    req.login(user, (err) => {
      if(err){
        return next(err)
      }
      res.json({user})
    })
  })(req, res, next)
}
