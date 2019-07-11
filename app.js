var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// client


// streamer source
app.use('/streamer', express.static(path.join(__dirname, 'temp-webcam-stream-page/')));

app.use('/app/robo-chat/', express.static(path.join(__dirname, 'webcam-control-stream-client/build')));
app.use('/app/sign-in/', express.static(path.join(__dirname, 'webcam-control-stream-client/build')));
app.use(express.static(path.join(__dirname, 'webcam-control-stream-client/build')));
// TODO fix manifest json

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
