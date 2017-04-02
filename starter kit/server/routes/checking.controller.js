exports.checking = (req, res) => {
  res.json({
    user: req.user ? req.user : {},
    success: req.user ? true : false
  });
}
