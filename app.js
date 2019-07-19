const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

// client
app.use('/app/robo-chat/', express.static(path.join(__dirname, 'webcam-control-stream-client/build')));
app.use('/app/sign-in/', express.static(path.join(__dirname, 'webcam-control-stream-client/build')));
app.use(express.static(path.join(__dirname, 'webcam-control-stream-client/build')));
// TODO fix manifest json

// api
app.use('/api/v1/users', usersRouter);

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
