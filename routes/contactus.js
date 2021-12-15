var express = require('express');
var router = express.Router();

const passport = require('passport');
var crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

//handle GET register
router.get('/signup', (req, res) => {
  res.render('signup', {title:'Signup page!'});
});

//checks if password has > 8 chars
function isValidPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}

//uses a regex to check if email is valid
function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//handles register POST
router.post('/signup', async function(req, res, next) {
  var salt = crypto.randomBytes(64).toString('hex');
  var password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512').toString('base64');

  if (!isValidPassword(req.body.password)) {
    return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
  }
  if (!isValidEmail(req.body.email)) {
    return res.json({status: 'error', message: 'Email address not formed correctly.'});
  }

  try {
    var user = await db.users.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
  } catch (err) {
    return res.json({status: 'error', message: 'Email address already exists.'});
  }
  if (user) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json({status: 'error', message: info.message});
      }
      req.session.context = 'authenticatedUser' ;
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Welcome!');
        res.redirect('/');
        //return res.json({status: 'ok'});
      });
    })(req, res, next);
  }
});

// handle GET login
router.get('/login', (req, res) => {
  res.render('login', {title:'Login page!'});
});

// handle POST login
router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect: 'login'}), (req, res) => {
  req.flash('success', 'welcome back!');
  req.session.context = 'authenticatedUser' ;
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    delete req.session.context;
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
});

module.exports = router;