import express from 'express';
import * as controller from './authentication.controller.js';
import passport from 'passport';

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

router.post('/register', controller.register);
router.get('/logout', controller.logout);

export default router;
