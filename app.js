/** Requirements */
const createError = require('http-errors');
const express = require('express'); // Express
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bycrypt = require('bcrypt'); // Bycrtpt
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
/* Local Requirements */
const config = require('./public/javascripts/config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const initializePassport = require('./public/javascripts/passport-config');

/** Initailize Passport */
initializePassport(
  passport,
  email => config.users.find(user => user.email === email),
  id => config.users.find(user => user.id === id)
);

/** APP */
const app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(session(config.session))
app.use(methodOverride('_method'));

/* Passport setup */
app.use(passport.initialize());
app.use(passport.session());

/* Add static path */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});
/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(config.port);
console.log('Server running at http://127.0.0.1:' + config.port + '/');

module.exports = app;
