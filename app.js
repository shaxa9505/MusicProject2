const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const musicAddRouter = require('./routes/musicAdd');
const music = require('./routes/music');
const musicEdit = require('./routes/musicEdit');
const login = require('./routes/login');


const app = express();
require("./helper/db")();



// validatorlar settings
const validator = require("express-validator");
const session = require("express-session");

// express-messages configure

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



// express-session configure

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

// express-validator 
app.use(validator({
  errorFormatter: (param, msg, value) => {
      let namespace = param.split(".")
      , root = namespace.shift()
      , formParam = root

      while(namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      }
  }
}))

const passport = require("passport");
require("./helper/passport")(passport);
app.use(passport.initialize())
app.use(passport.session())


app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next()
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', musicAddRouter);
app.use('/', music);
app.use('/', musicEdit);
app.use('/', login);

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
