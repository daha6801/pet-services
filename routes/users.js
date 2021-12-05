var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
 var db = require("../models");

passport.use(new LocalStrategy({
  username: 'username',
  password: 'password'
},
async function(username, password, done) {
  var user = await db.users.findOne(
    { where: {
      username: username
      }
    });
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}
));

module.exports = router;
