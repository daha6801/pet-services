var express = require('express');
var router = express.Router();

const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require("../models/users");
const controllers = require("../controllers/users.controller");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

router.get('/signup', (req, res) => {
  res.render('signup', {title:'Signup page!'});
});


router.post('/signup', catchAsync(async (req, res, next) => {
  try {
    const {email, username, password} = req.body;
    //const user = new users({email, username, password});
    
    // create user and persist in the database
    //controllers.createUser;
    // Note: using `force: true` will drop the table if it already exists
  User.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    email: 'John',
    username: 'Hancock',
    password: 'mypassword'
   });
 });

    const registeredUser = await users.register(user, password);

    
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', 'Welcome!');
      res.redirect('/');
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('signup');
  }
}));

router.get('/login', (req, res) => {
  res.render('login', {title:'Login page!'});
});

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect: 'login'}), (req, res) => {
  req.flash('success', 'welcome back!');
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
});

module.exports = router;