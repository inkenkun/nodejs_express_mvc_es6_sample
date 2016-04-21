require('babel-register')({
  presets: [ 'es2015' ]
});
var express = require('express');
var path = require('path');
var config = require('config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();


var index = require('./routes/index');

app.use(expressValidator({
  customValidators: {
    check_regular: function(param) {
      return !param.match( /[^0-9a-zA-Z_]+/ );
    }
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit:'100mb',extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ 
    host: config.redis.host,
    port: config.redis.port,
    prefix: 'sid',
    ttl: 60*60 
  }),
  cookie: {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 * 1000 // 1 week 
  }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;