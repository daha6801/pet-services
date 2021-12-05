var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
//const cors = require("cors");
var crypto = require('crypto');
//const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var featuredRouter = require('./routes/featured');
var contactUsRouter = require('./routes/contactus');
//var user = require('./models/users');

var app = express();
var server = http.createServer(app);

//listen on port 3000
server.listen(port,function(){
  console.log("Server running at "+ port);
});

const db = require('./models');
db.sequelize.sync();
var user = db.users;

const sessionConfig = {
  secret: 'Nullaquisloremutlibro',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(user.authenticate()));

/*passport.use(new LocalStrategy({
  email: 'email',
  password: 'password'
},
async function(email, password, done) {
  var user = await db.users.findOne(
    { where: {
        email: email
      }
    });
  if (user == null) {
    return done(null, false, { message: 'Incorrect email.' });
  }
  if (!user.validPassword(password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}
));*/

//serialize user
passport.serializeUser(function(user, done) {
  done(null, {email: user.email});
});

//deserialize user
passport.deserializeUser(function(user, done) {
  done(null,{email: user.email});
});

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/featured', featuredRouter);
app.use('/contactus', contactUsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
